import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Checkout.css';
import { createBooking } from '../models/bookingModel';  // Import the API call function

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(location.state?.slotDetails || null);

  useEffect(() => {
    if (!bookingDetails) {
      const storedBookingDetails = sessionStorage.getItem('bookingDetails');
      if (storedBookingDetails) {
        const parsedDetails = JSON.parse(storedBookingDetails);
        console.log("Loaded booking details from session:", parsedDetails); // Debugging log
        setBookingDetails(parsedDetails);
      }
    }
  }, [bookingDetails]);

  const handlePayment = async () => {
    try {
      // Retrieve user_id from localStorage (assuming user is logged in)
      const user_id = sessionStorage.getItem('userId');
      if (!user_id) {
        alert('User not logged in. Please log in to continue.');
        navigate('/login'); // Redirect to login page if user is not logged in
        return;
      }
  
      // Prepare booking data
      const bookingData = {
        Date: bookingDetails.bookingDate,
        Name: bookingDetails.name,
        user_id: user_id,
        // slot_id: bookingDetails.slotId, // Make sure slotId is available
        car_model: bookingDetails.carModel,
        plate_number: bookingDetails.plateNumber
      };
  
      // console.log("Booking data before API call:", bookingData); // Debugging log
  
      // Make API call to store booking in the database
      const response = await createBooking(bookingData);
      console.log("API response:", response);
  
      if (response.success) {
        alert("Booking confirmed!");
        navigate('/my-bookings'); // Redirect to My Bookings page after confirmation
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error storing booking details:", error);
      alert("There was an error confirming the booking. Please try again.");
    }
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
            <p><strong>Location:</strong> {bookingDetails.location}</p>
            <p><strong>Name:</strong> {bookingDetails.name}</p>
            <p><strong>Booking Date:</strong> {bookingDetails.bookingDate}</p>
            <p><strong>Car Model:</strong> {bookingDetails.carModel}</p>
            <p><strong>Plate Number:</strong> {bookingDetails.plateNumber}</p>
          </div>
        </motion.div>
      ) : (
        <p className="no-slot-message">No booking details found. Please go back to the dashboard to make a booking.</p>
      )}

      <motion.button
        className="renew-button"
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
      >
        Pay Now
      </motion.button>
      <br />

      <NavLink to="/dashboard" className="back-link">Back to Dashboard</NavLink>
    </div>
  );
};

export default Checkout;