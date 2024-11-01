import React from 'react';
import { motion } from 'framer-motion'; 
import '../styles/MyBookings.css'; 
import '../styles/Global.css'

const MyBookings = () => {
  const bookings = [
    {
      slot: 'A1',
      bookingDate: '28th September',
      timeRemaining: '28:49',
      slotDuration: '45 minutes',
    },
    {
      slot: 'B3',
      bookingDate: '29th September',
      timeRemaining: '15:20',
      slotDuration: '30 minutes',
    },
    {
      slot: 'C2',
      bookingDate: '30th September',
      timeRemaining: '10:12',
      slotDuration: '1 hour',
    }
  ];

  return (
    <div className="my-bookings-container">
      <h1 className="my-bookings-title">My Bookings</h1>

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
            </div>

            <div className="booking-time">
              <p><strong>Time Remaining:</strong> {booking.timeRemaining}</p>
              <p><strong>Slot Duration:</strong> {booking.slotDuration}</p>
            </div>

          
            <button className="renew-button">
              Renew Slot
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
