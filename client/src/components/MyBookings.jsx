import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import '../styles/MyBookings.css'; 
import '../styles/Global.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve bookings from sessionStorage
    const storedBookings = JSON.parse(sessionStorage.getItem('myBookings')) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="my-bookings-container">
      <h1 className="my-bookings-title">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <motion.div 
              key={index} 
              className="booking-card"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }} 
            >
              <div className="booking-details">
                <p><strong>Slot:</strong> {booking.slot}</p>
                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                <p><strong>Duration:</strong> {booking.bookingDuration} hours</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="no-bookings-message">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookings;
