// server/controllers/paymentDataController.js

const Payment = require('../models/Payments'); // Correct import to match the model export

// Create a new payment
exports.createPaymentData = async (req, res) => {
  const { booking_id, amount, success, created_at } = req.body;

  try {
    const payment = new Payment({
      booking_id,
      amount,
      success,
      created_at
    });

    const savedPayment = await payment.save();
    res.status(201).json({ success: true, data: savedPayment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment' });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('booking_id');
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
};

// Get payment by booking ID
exports.getPaymentByBookingId = async (req, res) => {
  const { booking_id } = req.params;

  try {
    const payment = await Payment.findOne({ booking_id }).populate('booking_id');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payment' });
  }
};
