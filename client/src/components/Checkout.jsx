// src/components/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
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
        car_model: bookingDetails.carModel,
        plate_number: bookingDetails.plateNumber
      };
  
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
    <div className="checkout-container" aria-label="Checkout page for booking confirmation">
      <h1 className="my-bookings-title" aria-label="Booking Summary Title">Booking Summary</h1>

      {bookingDetails ? (
        <motion.div
          className="booking-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          aria-label="Booking details card"
        >
          <div className="booking-details" aria-labelledby="bookingDetailsLabel">
            <p id="bookingDetailsLabel" className="sr-only">Detailed information about your booking</p>
            <p><strong>Slot:</strong> <span aria-label="Slot number">{bookingDetails.slot}</span></p>
            <p><strong>Location:</strong> <span aria-label="Location of parking slot">{bookingDetails.location}</span></p>
            <p><strong>Name:</strong> <span aria-label="Booking name">{bookingDetails.name}</span></p>
            <p><strong>Booking Date:</strong> <span aria-label="Date of booking">{bookingDetails.bookingDate}</span></p>
            <p><strong>Car Model:</strong> <span aria-label="Model of car">{bookingDetails.carModel}</span></p>
            <p><strong>Plate Number:</strong> <span aria-label="Car plate number">{bookingDetails.plateNumber}</span></p>
          </div>
        </motion.div>
      ) : (
        <p className="no-slot-message" aria-label="Message when no booking details found">No booking details found. Please go back to the dashboard to make a booking.</p>
      )}

      <motion.button
        className="renew-button"
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        aria-label="Pay Now button for booking confirmation"
      >
        Pay Now
      </motion.button>
      <br />

      <NavLink to="/dashboard" className="back-link" aria-label="Link back to dashboard">
        Back to Dashboard
      </NavLink>
    </div>
  );
};

export default Checkout;
