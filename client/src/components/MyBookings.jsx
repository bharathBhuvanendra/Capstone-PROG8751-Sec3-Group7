import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/MyBookings.css';
import '../styles/Global.css';
import { getBookings } from '../models/bookingModel';  // Import the correct API call function

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user_id = sessionStorage.getItem('userId'); // Retrieve user_id from localStorage
        if (!user_id) {
          alert('User not logged in. Please log in to continue.');
          return;
        }

        const response = await getBookings();  // Make API call
        if (response.success) {
          setBookings(response.bookings);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
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
                {/* <p><strong>Slot:</strong> {booking.slot_id?.name}</p> */}
                {/* <p><strong>Location:</strong> {booking.slot_id?.location}</p> */}
                <p><strong>Name:</strong> {booking.Name}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.Date).toLocaleDateString()}</p>
                <p><strong>Car Model:</strong> {booking.car_model}</p>
                <p><strong>Plate Number:</strong> {booking.plate_number}</p>
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
