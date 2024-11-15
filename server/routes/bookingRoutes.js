const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings (if needed)
router.get('/', bookingController.getBookings);

module.exports = router;
