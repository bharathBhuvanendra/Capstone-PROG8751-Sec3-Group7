// File: src/components/MyBookings.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/MyBookings.css';
import '../styles/Global.css';
import { getBookingsByUserId } from '../models/bookingModel';  // Use the correct function to get bookings by user_id

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const user_id = sessionStorage.getItem('userId'); // Retrieve user_id from sessionStorage
        if (!user_id) {
          alert('User not logged in. Please log in to continue.');
          return;
        }

        const response = await getBookingsByUserId(user_id);  // Make API call to get bookings by user_id
        if (response.success) {
          setBookings(response.bookings);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="my-bookings-container" aria-live="polite">
      <h1 className="my-bookings-title" aria-label="My Bookings">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="bookings-list" aria-label="List of bookings" role="list">
          {bookings.map((booking, index) => (
            <motion.div
              key={index}
              className="booking-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              role="listitem"
              aria-labelledby={`booking-${index}`}
            >
              <div className="booking-details">
                <p id={`booking-${index}`} aria-labelledby={`booking-${index}-name`}>
                  <strong>Name:</strong> {booking.Name}
                </p>
                <p id={`booking-${index}-date`} aria-labelledby={`booking-${index}-date`}>
                  <strong>Booking Date:</strong> {new Date(booking.Date).toLocaleDateString()}
                </p>
                <p id={`booking-${index}-car-model`} aria-labelledby={`booking-${index}-car-model`}>
                  <strong>Car Model:</strong> {booking.car_model}
                </p>
                <p id={`booking-${index}-plate-number`} aria-labelledby={`booking-${index}-plate-number`}>
                  <strong>Plate Number:</strong> {booking.plate_number}
                </p>
                <p id={`booking-${index}-duration`} aria-labelledby={`booking-${index}-duration`}>
                  <strong>Booking Duration:</strong> {booking.bookingDuration} 
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="no-bookings-message" aria-label="No bookings">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookings;
