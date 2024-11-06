// Checkout.jsx

import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { slotDetails } = location.state || {};

  return (
    <div className="checkout-container">
    <h2 className="checkout-title">Booking Summary</h2>
    {slotDetails ? (
      <div className="slot-card">
        <div className="slot-card-header">
          <h3>Slot: {slotDetails.slot}</h3>
        </div>
        <div className="slot-card-body">
          <p><strong>Name:</strong> {slotDetails.name}</p>
          <p><strong>Booking Date:</strong> {slotDetails.bookingDate}</p>
          <p><strong>Duration:</strong> {slotDetails.bookingDuration} hours</p>
        </div>
      </div>
      ) : (
        <p>No slot selected. Please go back and select a slot.</p>
      )}
      
      {/* Button container for Confirm Booking and Pay Now */}
      <div className="button-container">
        <motion.button 
          className="confirm-button"
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Booking confirmed!")}
        >
          Confirm Booking
        </motion.button>

        <motion.button 
          className="pay-button"
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Payment initiated!")}
        >
          Pay Now
        </motion.button>
      </div>
      
      <NavLink to="/dashboard" className="back-link">Back to Dashboard</NavLink>
    </div>
  );
};

export default Checkout;
