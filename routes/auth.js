// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');

// // Register route
// router.post('/register', registerUser);

// // Login route
// router.post('/login', loginUser);

// module.exports = router;

// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { title, fullName, lastName, dob, address, phone, email, nationalId, maritalStatus, gender, accountType, country, initialDeposit, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
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

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// routes/auth.js (add this below register route)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with the token
    res.json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

