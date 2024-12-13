// src/components/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import { createBooking } from '../models/bookingModel';
// import { createPayment } from '../models/paymentModel'; // Import the API call function for payment
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import ShowReceiptButton from './ShowReceiptButton';
import { createPaymentData } from '../models/paymentdataModel';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [bookingDetails, setBookingDetails] = useState(location.state?.slotDetails || null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!bookingDetails) {
      const storedBookingDetails = sessionStorage.getItem('bookingDetails');
      if (storedBookingDetails) {
        const parsedDetails = JSON.parse(storedBookingDetails);
        console.log("Loaded booking details from session:", parsedDetails);
        setBookingDetails(parsedDetails);
      }
    } else {
      // Calculate the total amount based on booking duration
      const duration = parseInt(bookingDetails.bookingDuration, 10);
      const amount = duration * 10; // $10 per hour
      setTotalAmount(amount);
    }
  }, [bookingDetails]);

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log("Pay Now button clicked. Starting payment process...");
    console.log("Booking Details: ", bookingDetails);

    if (!stripe || !elements) {
      console.error("Stripe or Elements has not loaded yet.");
      return; // Stripe.js has not loaded yet.
    }

    try {
      // Confirm the card payment
      console.log("Confirming card payment...");

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/my-bookings`,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        console.error("Error processing payment: ", result.error.message);
        alert(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful! PaymentIntent:', result.paymentIntent);
        alert('Payment successful!');

        // Retrieve user_id from sessionStorage (assuming user is logged in)
        const user_id = sessionStorage.getItem('userId');
        if (!user_id) {
          alert('User not logged in. Please log in to continue.');
          navigate('/login');
          return;
        }

        // Prepare booking data
        const bookingData = {
          Date: bookingDetails.bookingDate,
          Name: bookingDetails.name,
          user_id: user_id,
          car_model: bookingDetails.carModel,
          plate_number: bookingDetails.plateNumber,
          slot_id: bookingDetails.slotId,
          bookingDuration: bookingDetails.bookingDuration,
          amount: totalAmount,
        };

        console.log("Creating booking with data:", bookingData);

        // Make API call to store booking in the database
        const bookingResponse = await createBooking(bookingData);
        console.log("Booking API response:", bookingResponse);

        if (bookingResponse.success) {
          alert("Booking confirmed!");

          // Create payment data
          const paymentData = {
            booking_id: bookingResponse.data._id, // Assuming booking ID is returned from booking creation
            amount: totalAmount,
            success: true, // Payment was successful
          };

          // Make API call to store payment in the database
          const paymentResponse = await createPaymentData(paymentData);
          console.log("Payment API response:", paymentResponse);

          if (paymentResponse.success) {
            console.log("Payment saved successfully:", paymentResponse);
            setPaymentSuccess(true);
          } else {
            console.error("Failed to save payment. API response:", paymentResponse);
            alert("Payment confirmed but failed to record payment details. Please contact support.");
          }
        } else {
          console.error("Failed to create booking. API response:", bookingResponse);
          alert("Failed to create booking. Please try again.");
        }
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
            <p><strong>Booking Duration:</strong> <span aria-label="Booking duration">{bookingDetails.bookingDuration} hours</span></p>
            <p><strong>Car Model:</strong> <span aria-label="Model of car">{bookingDetails.carModel}</span></p>
            <p><strong>Plate Number:</strong> <span aria-label="Car plate number">{bookingDetails.plateNumber}</span></p>
            <p><strong>Total Amount:</strong> <span aria-label="Total amount">${totalAmount}</span></p>
          </div>
        </motion.div>
      ) : (
        <p className="no-slot-message" aria-label="Message when no booking details found">No booking details found. Please go back to the dashboard to make a booking.</p>
      )}

      {stripe ? (
        <form onSubmit={handlePayment} className="payment-form">
          <PaymentElement />
          <motion.button
            className="renew-button"
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!stripe}
            aria-label="Pay Now button for booking confirmation"
          >
            Pay Now
          </motion.button>
        </form>
      ) : (
        <p>Loading payment details, please wait...</p>
      )}

      {paymentSuccess && <ShowReceiptButton />}

      <br />

      <NavLink to="/dashboard" className="back-link" aria-label="Link back to dashboard">
        Back to Dashboard
      </NavLink>
    </div>
  );
};

export default Checkout;
