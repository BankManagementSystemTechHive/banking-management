const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // Import the user routes
const bcrypt = require('bcryptjs');  // For hashing passwords
const User = require('./models/User'); // User model (defined below)

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/BankManagement'; // 
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the user routes for all requests to /api/users
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
//dummy text  dhcxhhxhdhvd hbbbhh
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
