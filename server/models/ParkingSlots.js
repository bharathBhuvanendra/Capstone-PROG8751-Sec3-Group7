const mongoose = require('mongoose');

const ParkingSlotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availableLots: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ParkingSlot', ParkingSlotSchema);
