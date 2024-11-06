const Booking = require('../models/Bookings');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings (if needed)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user_id').populate('slot_id');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
