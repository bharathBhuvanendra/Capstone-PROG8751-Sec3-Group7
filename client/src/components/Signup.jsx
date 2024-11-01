import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';
import '../styles/Global.css';
import { createUser } from '../models/userModel';  // Import the API function

const Signup = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Call createUser API
    try {
      const response = await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        // username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        alert('User created successfully!');
        // Optionally, redirect to login page
      } else {
        setError(response.message || 'Failed to create user');
      }
    } catch (error) {
      setError('An error occurred while creating the user');
    }
  };

  return (
    <div className="signup-container">
      <motion.div 
        className="signup-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="signup-title">Create an Account</h2>

        {error && <p className="error-text">{error}</p>}  {/* Display error messages */}

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label" htmlFor="firstName">
              First Name
            </label>
            <input 
              className="input-field"
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="lastName">
              Last Name
            </label>
            <input 
              className="input-field"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="input-container">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input 
              className="input-field"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div> */}

          <div className="input-container">
            <label className="input-label" htmlFor="email">
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
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">
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
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input 
              className="input-field"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <motion.button 
              className="signup-button"
              whileHover={{ scale: 1.05 }}
              type="submit"
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-center">
          Already have an account? 
          <Link to="/login" className="login-link">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
