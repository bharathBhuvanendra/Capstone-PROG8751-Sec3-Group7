// server/routes/paymentdataRoutes.js

const express = require('express');
const router = express.Router();
const paymentDataController = require('../controllers/PaymentDataController'); // Make sure the file name matches

// Create a new payment
router.post('/', paymentDataController.createPaymentData);

// Get all payments
router.get('/', paymentDataController.getAllPayments);

// Get payment by booking ID
router.get('/booking/:booking_id', paymentDataController.getPaymentByBookingId);

module.exports = router;
