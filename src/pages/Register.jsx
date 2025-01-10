import React, { useState } from 'react';
import './Register.css';  // Import the custom CSS for Register page
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';  // Material UI components for the form
import axios from 'axios';

function Register() {
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [branch, setBranch] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!fullName) errors.fullName = 'Full name is required';
    if(!lastName) errors.lastName = 'Last name is required'
    if (!dob) errors.dob = 'Date of birth is required';
    if (!address) errors.address = 'Address is required';
    if (!phone) errors.phone = 'Phone number is required';
    if (!email) errors.email = 'Email is required';
    if (!nationalId) errors.nationalId = 'National ID is required';
    if (!accountType) errors.accountType = 'Account type is required';
    if (!branch) errors.branch = 'Branch is required';
    if (!securityQuestion) errors.securityQuestion = 'Security question is required';
    if (!securityAnswer) errors.securityAnswer = 'Security answer is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';

    // Email format validation
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not valid';
    }

    // Password match and strength validation
    if (password && confirmPassword && password !== confirmPassword) {
      errors.password = 'Passwords do not match';
      errors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation (basic example for a 10-digit number)
    if (phone && !/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    // National ID validation (optional: adjust as per your needs)
    if (nationalId && !/^\d{6,12}$/.test(nationalId)) {
      errors.nationalId = 'National ID should be between 6 and 12 digits';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are validation errors, stop the form submission
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        fullName,
        lastName,
        dob,
        address,
        phone,
        email,
        nationalId,
        accountType,
        branch,
        initialDeposit,
        securityQuestion,
        securityAnswer,
        password,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="form-row">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
              </div>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />
        

          <div className="form-row">
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="National ID / Passport"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              error={!!errors.nationalId}
              helperText={errors.nationalId}
            />
          </div>

          {/* Account Information */}
          <div className="form-row">
            <FormControl fullWidth margin="normal" error={!!errors.accountType}>
              <InputLabel>Account Type</InputLabel>
              <Select
                label="Account Type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <MenuItem value="savings">Savings</MenuItem>
                <MenuItem value="checking">Checking</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Branch"
              variant="outlined"
              fullWidth
              margin="normal"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              error={!!errors.branch}
              helperText={errors.branch}
            />
            <TextField
              label="Initial Deposit"
              variant="outlined"
              fullWidth
              margin="normal"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              type="number"
            />
          </div>

          {/* Security Information */}
          <div className="form-row">
            <FormControl fullWidth margin="normal" error={!!errors.securityQuestion}>
              <InputLabel>Security Question</InputLabel>
              <Select
                label="Security Question"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              >
                <MenuItem value="mothers_maiden_name">What is your mother's maiden name?</MenuItem>
                <MenuItem value="first_pet">What was the name of your first pet?</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Answer to Security Question"
              variant="outlined"
              fullWidth
              margin="normal"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              error={!!errors.securityAnswer}
              helperText={errors.securityAnswer}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>

          <div className="form-row">
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={Object.keys(errors).length > 0}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
