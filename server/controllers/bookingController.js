// File: server/controllers/bookingController.js
const mongoose = require('mongoose');
const Booking = require('../models/Bookings');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { Date, Name, user_id, car_model, plate_number, bookingDuration, amount } = req.body;

    if (!Date || !Name || !user_id || !car_model || !plate_number || !bookingDuration || !amount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id' });
    }

    const newBooking = new Booking({ Date, Name, user_id, car_model, plate_number, bookingDuration, amount });
    const booking = await newBooking.save();

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error while creating booking: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all bookings (unchanged)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user_id');
    res.json(bookings);
  } catch (error) {
    console.error("Error while fetching bookings: ", error);
    res.status(500).json({ error: error.message });
  }
};

// Get bookings by user_id (new function)
exports.getBookingsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id' });
    }

    const bookings = await Booking.find({ user_id }).populate('user_id');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error while fetching bookings for user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
