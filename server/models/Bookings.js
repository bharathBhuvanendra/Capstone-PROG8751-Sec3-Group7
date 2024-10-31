const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  duration: { type: Number, required: true },
  payment_status: { type: String, default: 'pending' },
  payment_id: { type: String }
});

module.exports = mongoose.model('Booking', BookingSchema);
