import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  

  // Handle log out action
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    sessionStorage.removeItem('userId'); // Remove userId from sessionStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavLink to="/" >
        <div className="logo-container">
          <Logo /> 
          <h1 className="navbar-title">PARK-A-LOT</h1>
        </div>
      </NavLink>
      
      <ul className="nav-links">
        <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
          >
            Dashboard
          </NavLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink 
            to="/my-bookings" 
            className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
          >
            My Bookings
          </NavLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.1 }}>
          {token ? (
            <button onClick={handleLogout} className="nav-link logout-button">
              Log Out
            </button>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
            >
              Log In
            </NavLink>
          )}
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
