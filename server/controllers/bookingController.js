// File: server/controllers/bookingController.js
const mongoose = require('mongoose');  // <-- Add this line
const Booking = require('../models/Bookings');

// Create a new booking


exports.createBooking = async (req, res) => {
  console.log("Received booking creation request: ", req.body); // Log received data
  try {
    // Destructure and validate incoming data
    const { Date, Name, user_id, car_model, plate_number } = req.body;

    if (!Date || !Name || !user_id || !car_model || !plate_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate ObjectId fields
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id or slot_id' });
    }

    const newBooking = new Booking({ Date, Name, user_id, car_model, plate_number });
    const booking = await newBooking.save();

    // Updated response to match client expectations
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error while creating booking: ", error); // Log the actual error
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all bookings (if needed)
exports.getBookings = async (req, res) => {
  try {
    const { user_id } = req.query;
    const query = user_id ? { user_id } : {};
    const bookings = await Booking.find(query).populate('user_id');
    console.log('Get bookings returns: ', bookings)
    res.json(bookings);
  } catch (error) {
    console.error("Error while fetching bookings: ", error);
    res.status(500).json({ error: error.message });
  }
};

