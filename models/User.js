// Import Mongoose
const mongoose = require('mongoose');

// Create a schema for the user
const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nationalId: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  gender: { type: String, required: true },
  accountType: { type: String, required: true },
  country: { type: String, required: true },
  initialDeposit: { type: Number, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  password: { type: String, required: true }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other parts of your app
module.exports = User;
