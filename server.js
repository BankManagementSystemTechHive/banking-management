// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of the Express app
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdb', {  // Replace 'yourdb' with your database name
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Set up routes
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
app.use('/api/auth', authRoutes);  // Prefix routes with '/api/auth'

// Set up a default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Set the port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
