// server.js (Node.js with Express)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');  // For hashing passwords
const User = require('./models/User'); // User model (defined below)

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json()); // For parsing JSON bodies

// Registration Route
app.post('/api/auth/register', async (req, res) => {
  const { title, fullName, lastName, dob, address, phone, email, nationalId, maritalStatus, gender, accountType, country, initialDeposit, securityQuestion, securityAnswer, password } = req.body;

  // Validate the data
  if (!email || !password || !fullName || !lastName) {
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
      securityQuestion,
      securityAnswer,
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
