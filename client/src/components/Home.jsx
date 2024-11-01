import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css'; 

const Home = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: '',
    name: '',
    bookingDuration: ''
  });

  // Dummy slot data
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

  const handleBooking = () => {
    if (!formData.bookingDate || !formData.name || !formData.bookingDuration) {
      alert("Please fill out all fields!");
      return;
    }

    const message = selectedSlot
      ? `Slot ${selectedSlot} booked for ${formData.name} on ${formData.bookingDate} for ${formData.bookingDuration} hours.`
      : `Booking confirmed for ${formData.name} on ${formData.bookingDate} for ${formData.bookingDuration} hours.`;

    alert(message);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Book your parking slot</h1>

      <div className="booking-grid">
        {slots.map((slot, index) => (
          <motion.div 
            key={index} 
            className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => handleSlotSelect(slot)} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}  w
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

export default Home;
