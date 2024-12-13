const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  Name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car_model: { type: String, required: true },
  plate_number: { type: String, required: true },
  bookingDuration: { type: Number, required: true },  // Added bookingDuration field to track hours booked
  amount: { type: Number, required: true },  // Added amount field to store the total cost of booking
});

module.exports = mongoose.model('Booking', BookingSchema);
