import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/Global.css';
import { loginUser } from '../models/userModel';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Assuming loginUser function in client/userModel.js handles the API request
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!/^[\w-.]+@([\w-]+\.)+com$/.test(formData.email)) {
    setError('Please enter a valid email address');
    return;
  }

  try {
    const response = await loginUser(formData);  // Make API call
    console.log('Login response:', response); // Log the entire response to see what it contains

    if (response.success) {
      localStorage.setItem('token', response.token); // Store the token
      sessionStorage.setItem('userId', response.userId); // Store user ID

      // Verify if userEmail is present in the response
      if (response.userEmail) {
        console.log("Storing userEmail:", response.userEmail);
        sessionStorage.setItem('userEmail', response.userEmail); // Store user email
      } else {
        console.error("userEmail not found in response.");
      }

      alert('Login successful!');
      if (response.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(response.message || 'Failed to log in');
    }
  } catch (error) {
    console.error('Error during login:', error);
    setError('An error occurred while logging in');
  }
};


  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-labelledby="login-title"
      >
        <h2 id="login-title" className="login-title">Sign into your account</h2>

        {error && <p className="error-text" role="alert" aria-live="assertive">{error}</p>}

        <form className="space-y-8" onSubmit={handleSubmit} aria-labelledby="login-form-title">
          <h3 id="login-form-title" className="sr-only">Login form for existing users</h3>

          <div className="input-container">
            <label className="input-label" htmlFor="email" aria-label="Email Address">
              Email
            </label>
            <input 
              className="input-field"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-describedby="email-help"
            />
            <small id="email-help" className="form-help-text">Please enter your registered email address.</small>
          </div>
          
          <div className="input-container">
            <label className="input-label" htmlFor="password" aria-label="Password">
              Password
            </label>
            <input 
              className="input-field"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-describedby="password-help"
            />
            <small id="password-help" className="form-help-text">Your password is case-sensitive.</small>
          </div>

          <div className="flex items-center justify-between">
            <motion.button 
              className="login-button"
              whileHover={{ scale: 1.05 }}
              type="submit"
              aria-label="Sign in to your account"
            >
              Sign In
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-center">
          Don’t have an account? 
          <Link to="/signup" className="signup-link" aria-label="Go to signup page">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
