const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User'); // Import the updated User model

const app = express();
app.use(cors());
app.use(express.json());

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
