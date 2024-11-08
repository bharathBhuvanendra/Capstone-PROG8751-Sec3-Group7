// src/components/Signup.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';
import '../styles/Global.css';
import { createUser } from '../models/userModel';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = 'First name should contain only alphabets';
    }

    if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = 'Last name should contain only alphabets';
    }

    if (!/^[\w-.]+@([\w-]+\.)+com$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (password.length < 8) {
      newErrors.password = 'Password should be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        alert('User created successfully!');
      } else {
        setErrors({ form: response.message || 'Failed to create user' });
      }
    } catch (error) {
      setErrors({ form: 'An error occurred while creating the user' });
    }
  };

  return (
    <div className="signup-container" aria-label="Signup form container">
      <motion.div 
        className="signup-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Signup form card"
      >
        <h2 className="signup-title">Create an Account</h2>

        {errors.form && <p className="error-text" aria-live="assertive">{errors.form}</p>}

        <form className="space-y-8" onSubmit={handleSubmit} aria-label="Signup form">
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
              aria-label="Enter your first name"
            />
            {errors.firstName && <p className="error-text" aria-live="assertive">{errors.firstName}</p>}
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
              aria-label="Enter your last name"
            />
            {errors.lastName && <p className="error-text" aria-live="assertive">{errors.lastName}</p>}
          </div>

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
              aria-label="Enter your email"
            />
            {errors.email && <p className="error-text" aria-live="assertive">{errors.email}</p>}
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
              aria-label="Enter your password"
            />
            {errors.password && <p className="error-text" aria-live="assertive">{errors.password}</p>}
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
              aria-label="Confirm your password"
            />
            {errors.confirmPassword && <p className="error-text" aria-live="assertive">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center justify-between">
            <motion.button 
              className="signup-button"
              whileHover={{ scale: 1.05 }}
              type="submit"
              aria-label="Submit form to create account"
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-center">
          Already have an account? 
          <Link to="/login" className="login-link" aria-label="Navigate to login page">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
