import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom'; 
import Logo from './Logo';
import '../styles/Navbar.css'; 
import '../styles/Global.css';

const Navbar = () => {
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
            to="/checkout" 
            className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
          >
            Checkout
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
          <NavLink 
            to="/login" 
            className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
          >
            Log In
          </NavLink>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
