import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';
import axios from 'axios'; // Import axios for making HTTP requests



const Dashboard = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: '',
    name: '',
    bookingDuration: '',
  });
  const navigate = useNavigate();

  const slots = [
    'A1', 'B1', 'C1', 'D1', 'E1',
    'A2', 'B2', 'C2', 'D2', 'E2',
    'A3', 'B3', 'C3', 'D3', 'E3',
    'A4', 'B4', 'C4', 'D4', 'E4',
    'A5', 'B5', 'C5', 'D5', 'E5',
    'A6', 'B6', 'C6', 'D6', 'E6',
  ];

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    if (!formData.bookingDate || !formData.name || !formData.bookingDuration) {
      alert("Please fill out all fields!");
      return;
    }

    if (!selectedSlot) {
      alert("Please select a slot!");
      return;
    }

    // Here, replace 'YOUR_USER_ID' with the actual user ID obtained from your authentication system
    const userId = 'YOUR_USER_ID'; // You'll get this from your login or signup process

    // Prepare booking details for the backend
    const bookingDetails = {
      slot_id: selectedSlot,
      user_id: userId, // Using the retrieved user ID
      start_time: formData.bookingDate,
      end_time: new Date(new Date(formData.bookingDate).getTime() + formData.bookingDuration * 60 * 60 * 1000),
      duration: formData.bookingDuration,
    };

    // Store booking details in session storage
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    try {
      // Send booking data to the server
      const response = await axios.post('/api/bookings', bookingDetails);
      if (response.status === 201) {
        alert("Booking confirmed!");
        navigate('/checkout', { state: { slotDetails: bookingDetails } });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("There was an error booking the slot. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Book your parking slot</h1>

      <div className="booking-grid">
        {slots.map((slot, index) => (
          <motion.div
            key={index}
            className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => handleSlotSelect(slot)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {slot}
          </motion.div>
        ))}
      </div>

      <div className="slot-info">
        {selectedSlot && (
          <p>Slot Selected: <strong>{selectedSlot}</strong></p>
        )}
      </div>

      <form className="booking-form">
        <div className="form-group">
          <label htmlFor="bookingDate">Booking Date:</label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bookingDuration">Booking Duration (hours):</label>
          <input
            type="number"
            id="bookingDuration"
            name="bookingDuration"
            value={formData.bookingDuration}
            onChange={handleInputChange}
            placeholder="Enter duration in hours"
            required
          />
        </div>

        <motion.button
          className="book-button"
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleBooking}
        >
          Book Slot
        </motion.button>
      </form>
    </div>
  );
};

export default Dashboard;
