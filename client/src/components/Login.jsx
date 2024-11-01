import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/Global.css';
import { loginUser } from '../models/userModel';  // Import the API call function

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);  // Make API call

      if (response.success) {
        alert('Login successful!');
        navigate('/dashboard');  // Redirect to dashboard after successful login
      } else {
        setError(response.message || 'Failed to log in');
      }
    } catch (error) {
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
      >
        <h2 className="login-title">Sign into your account</h2>

        {error && <p className="error-text">{error}</p>}  {/* Display error messages */}

        <form className="space-y-8" onSubmit={handleSubmit}>
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

          <div className="flex items-center justify-between">
            <motion.button 
              className="login-button"
              whileHover={{ scale: 1.05 }}
              type="submit"
            >
              Sign In
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-center">
          Don’t have an account? 
          <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
