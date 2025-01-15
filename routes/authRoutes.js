// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import the User model
const { check, validationResult } = require('express-validator');  // For more validation

// Create an instance of the router
const router = express.Router();

// Registration route
router.post(
  '/register',
  // Express Validator for email and password validations
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('fullName', 'Full name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty()
  ],
  async (req, res) => {
    // Get the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const {
      title, fullName, lastName, dob, address, phone, email, nationalId, maritalStatus,
      gender, accountType, country, initialDeposit, password
    } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        title, fullName, lastName, dob, address, phone, email, nationalId, maritalStatus,
        gender, accountType, country, initialDeposit,
        password: hashedPassword
      });

      // Save the new user to the database
      await newUser.save();

      // Return success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Export the router so it can be used in other parts of the app
module.exports = router;
