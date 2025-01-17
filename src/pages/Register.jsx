import React, { useState } from 'react';
import './Register.css';  // Import the custom CSS for Register page
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';  // Material UI components for the form
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  


function Register() {

  const navigate = useNavigate(); 

  const[title, setTitle] =useState('');
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [accountType, setAccountType] = useState('');
  const [country, setCountry] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if(!title) errors.title ="Title is required "
    if (!fullName) errors.fullName = 'Full name is required';
    if(!lastName) errors.lastName = 'Last name is required'
    if (!dob) errors.dob = 'Date of birth is required';
    if (!address) errors.address = 'Address is required';
    if (!phone) errors.phone = 'Phone number is required';
    if (!email) errors.email = 'Email is required';
    if (!nationalId) errors.nationalId = 'National ID is required';
    if(!maritalStatus) errors.maritalStatus = 'Marital Status is required'
    if(!gender) errors.gender ="Gender is required"
    if (!accountType) errors.accountType = 'Account type is required';
    if (!country) errors.country = 'Country is required';
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
    if (nationalId && !/^\d{13}$/.test(nationalId)) {
      errors.nationalId = 'National ID should be 13 digits';
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
      const response = await axios.post('http://localhost:5000/register', {
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
        password,
      });
      navigate('/login'); // Ensure you have a route for '/home'

      console.log('Registration successful:', response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Show backend error message
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
    
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="form-row">

          <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />

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
            
          
              </div>

             <div className="form-row">  

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
        
            </div>

            <div className="form-row">
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
            <FormControl fullWidth margin="normal" error={!!errors.maritalStatus}>
              <InputLabel>Marital Status</InputLabel>
              <Select
                label="Marital Status"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="customary Marriage">Customary Marriage</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                
              </Select>
            </FormControl>
          </div>

          {/* Account Information */}
          <div className="form-row">
          <FormControl fullWidth margin="normal" error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

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
              label="country"
              variant="outlined"
              fullWidth
              margin="normal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={!!errors.country}
              helperText={errors.country}
            />
         
          </div>

          {/* Security Information */}
          <div className="form-row">
          <TextField
              label="Initial Deposit"
              variant="outlined"
              fullWidth
              margin="normal"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              type="number"
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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={Object.keys(errors).length = 0}>
            Register
          </Button>
        </form>
        <div className="backtologin">Have an account ? <a href="/"><span>Login</span></a></div>
      </div>
    </div>
  );
}

export default Register;
