// server/models/payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  success: { type: Boolean, default: false }, // Boolean to represent payment success
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema); // Export the model correctly
