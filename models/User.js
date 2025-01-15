const mongoose = require('mongoose');

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
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
