const express = require('express');
const router = express.Router();

// Example user registration route
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // You can add your MongoDB user creation logic here (e.g., saving to a "User" model)
    
    // For now, we'll just send back the received data
    res.status(201).send({ 
        message: 'User registered successfully', 
        user: { username, email }
    });
});

module.exports = router;