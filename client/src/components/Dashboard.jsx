import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const parkingLots = [
        { name: 'Lot A', location: 'Downtown', availableLots: 20 },
        { name: 'Lot B', location: 'Uptown', availableLots: 15 },
        { name: 'Lot C', location: 'Suburb', availableLots: 25 },
        { name: 'Lot D', location: 'City Center', availableLots: 10 },
    ];

    const [selectedLot, setSelectedLot] = useState(null);
    const [formData, setFormData] = useState({
        bookingDate: '',
        name: '',
        bookingDuration: '',
        carModel: '',
        plateNumber: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBooking = () => {
        if (!selectedLot) {
            alert("Please select a parking lot!");
            return;
        }
        if (!formData.bookingDate || !formData.name || !formData.bookingDuration || !formData.carModel || !formData.plateNumber) {
            alert("Please fill out all fields!");
            return;
        }
        const bookingDetails = {
            slot: selectedLot.name,
            slotId: selectedLot.id, // Make sure this ID is included
            location: selectedLot.location,
            name: formData.name,
            bookingDate: formData.bookingDate,
            bookingDuration: formData.bookingDuration,
            carModel: formData.carModel,
            plateNumber: formData.plateNumber
        };
        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        navigate('/checkout', { state: { slotDetails: bookingDetails } });
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title" aria-label="Parking Lot Dashboard">Parking Lot Dashboard</h1>
            <div className="parking-lot-selection" role="list" aria-label="Select a parking lot">
                {parkingLots.map((lot, index) => (
                    <motion.div
                        key={index}
                        className={`parking-lot-card ${selectedLot && selectedLot.name === lot.name ? 'selected-lot' : ''}`}
                        onClick={() => setSelectedLot(lot)}
                        whileTap={{ scale: 0.95 }}
                        role="listitem"
                        aria-selected={selectedLot && selectedLot.name === lot.name}
                        aria-labelledby={`lot-${index}-name`}
                    >
                        <h2 id={`lot-${index}-name`}>{lot.name}</h2>
                        <p><strong>Location:</strong> {lot.location}</p>
                        <p><strong>Available Lots:</strong> {lot.availableLots}</p>
                    </motion.div>
                ))}
            </div>

            {selectedLot && (
                <form className="booking-form" aria-labelledby="form-title" aria-describedby="form-description">
                    <h2 id="form-title">Booking Form</h2>
                    <p id="form-description">Please fill out the form to book your parking slot at {selectedLot.name}.</p>

                    <div className="form-group">
                        <label htmlFor="bookingDate">Booking Date:</label>
                        <input
                            type="date"
                            id="bookingDate"
                            name="bookingDate"
                            value={formData.bookingDate}
                            onChange={handleInputChange}
                            required
                            aria-required="true"
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
                            aria-required="true"
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
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="carModel">Car Model:</label>
                        <input
                            type="text"
                            id="carModel"
                            name="carModel"
                            value={formData.carModel}
                            onChange={handleInputChange}
                            placeholder="Enter your car model"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="plateNumber">Plate Number:</label>
                        <input
                            type="text"
                            id="plateNumber"
                            name="plateNumber"
                            value={formData.plateNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your plate number"
                            required
                            aria-required="true"
                        />
                    </div>

                    <motion.button
                        className="book-button"
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleBooking}
                        aria-label="Book parking slot"
                    >
                        Book Slot
                    </motion.button>
                </form>
            )}
        </div>
    );
};

export default Dashboard;
