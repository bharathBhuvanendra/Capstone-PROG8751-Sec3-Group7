const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  Date: { type: Date , required: true },
  Name:{ type:String, required: true  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  
  car_model: { type: String, required: true },
  plate_number: { type: String, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
