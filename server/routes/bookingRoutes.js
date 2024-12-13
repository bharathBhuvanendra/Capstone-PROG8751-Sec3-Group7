// File: server/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getBookings);

// Get bookings by user_id
router.get('/user/:user_id', bookingController.getBookingsByUserId);

module.exports = router;
