const mongoose = require('mongoose');

const ParkingSlotSchema = new mongoose.Schema({
  slot_number: { type: String, required: true, unique: true },
  is_available: { type: Boolean, default: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('ParkingSlot', ParkingSlotSchema);
