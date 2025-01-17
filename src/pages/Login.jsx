import React, { useState } from 'react';
import './Login.css';  // Import the custom CSS for Login page
import { TextField, Button } from '@mui/material';  // Material UI components for the form
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});  // State to store form validation errors
  const navigate = useNavigate();  // Initialize useNavigate hook

  const validateForm = () => {
    const errors = {};
    
    // Basic email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setErrors(errors);  // Set errors state

    // Return true if no errors, otherwise return false
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form submission and page reload
    
    // Validate the form before submitting
    if (!validateForm()) {
      return;  // If validation fails, do not submit the form
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      
      console.log('Login successful:', response.data);

      // After successful login, navigate to the /home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      // Optionally, handle the error (show a message or something)
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/images/logoNEW.jpg" alt="" className='LOGO' />
        <h1>LOGIN </h1>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}  // Display error if email is invalid
            helperText={errors.email}  // Show error message under email field
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}  // Display error if password is invalid
            helperText={errors.password}  // Show error message under password field
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      <div className="registerField">Do not have an account?<a href="register"><span>Register</span></a></div>
        </div>
      </div>
    
  );
}

export default Login;
