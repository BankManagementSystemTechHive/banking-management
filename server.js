const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const User = require('./models/User'); // Import the updated User model

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend to access backend
  credentials: true,  // Allow cookies (sessions) to be passed
}));

// Set up session management
app.use(session({
  secret: 'yourSecret', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure: true if you're using HTTPS in production
}));

// MongoDB connection URI (make sure it's set in .env or directly in the code)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://neo:12345@cluster0.gjtkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Registration Route
app.post('/register', async (req, res) => {
  const { title, fullName, lastName, dob, address, phone, email, nationalId, maritalStatus, gender, accountType, country, initialDeposit, password } = req.body;

  // Validate the data (make sure required fields are provided)
  if (!email || !password || !fullName || !lastName || !dob || !address || !phone || !nationalId || !maritalStatus || !gender || !accountType || !country || !initialDeposit) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      title,
      fullName,
      lastName,
      dob,
      address,
      phone,
      email,
      nationalId,
      maritalStatus,
      gender,
      accountType,
      country,
      initialDeposit,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the submitted password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store userId in session (for later use to fetch the profile)
    req.session.userId = user._id;

    // Respond with success and user data (without password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch Profile Route (protected route)
app.get('/profile', (req, res) => {
  // Ensure that the user is logged in by checking the session
  const userId = req.session.userId;  // Retrieve userId from session
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Fetch the user profile from the database
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send the user profile data
      res.status(200).json({
        name: user.fullName,
        email: user.email,
        
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
