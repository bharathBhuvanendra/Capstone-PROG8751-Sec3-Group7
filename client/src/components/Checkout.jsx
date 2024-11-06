import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, NavLink, useNavigate } from 'react-router-dom'; 
import '../styles/Checkout.css'; 

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(location.state?.slotDetails || null);

  useEffect(() => {
    if (!bookingDetails) {
      const storedBookingDetails = sessionStorage.getItem('bookingDetails');
      if (storedBookingDetails) {
        setBookingDetails(JSON.parse(storedBookingDetails));
      }
    }
  }, [bookingDetails]);

  const handlePayment = () => {
    alert("Booking confirmed!");

    // Store booking in sessionStorage for My Bookings
    const storedBookings = JSON.parse(sessionStorage.getItem('myBookings')) || [];
    storedBookings.push(bookingDetails);
    sessionStorage.setItem('myBookings', JSON.stringify(storedBookings));

    // Navigate back to Homepage or Dashboard
    navigate('/'); // Change to the correct path for the homepage
  };

  return (
    <div className="checkout-container">
      <h1 className="my-bookings-title">Booking Summary</h1>

      {bookingDetails ? (
        <motion.div 
          className="booking-card"
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }} 
        >
          <div className="booking-details">
            <p><strong>Slot:</strong> {bookingDetails.slot}</p>
            <p><strong>Name:</strong> {bookingDetails.name}</p>
            <p><strong>Booking Date:</strong> {bookingDetails.bookingDate}</p>
            <p><strong>Duration:</strong> {bookingDetails.bookingDuration} hours</p>
          </div>
        </motion.div>
      ) : (
        <p className="no-slot-message">No booking details found. Please go back to the dashboard to make a booking.</p>
      )}

      <motion.button 
        className="renew-button"
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment} // Handle payment confirmation
      >
        Pay Now
      </motion.button>
      <br />

      <NavLink to="/dashboard" className="back-link">Back to Dashboard</NavLink>
    </div>
  );
};

export default Checkout;
