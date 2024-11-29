const mongoose = require('mongoose'); // Add missing mongoose import
const ParkingSlot = require('../models/ParkingSlots');

// Get all parking lots
exports.getParkingSlots = async (req, res) => {
    try {
        console.log('Attempting to fetch parking slots from database...');
        // Check if there are any parking lots in the database
        let existingParkingSlots = await ParkingSlot.find();
        console.log('Existing parking slots:', existingParkingSlots);

        if (existingParkingSlots.length === 0) {
            // Seed initial parking lot data if none exist
            console.log('No parking slots found, seeding initial data...');
            const parkingLots = [
                { name: 'Lot A', location: 'Downtown', availableLots: 20 },
                { name: 'Lot B', location: 'Uptown', availableLots: 15 },
                { name: 'Lot C', location: 'Suburb', availableLots: 25 },
            ];
            existingParkingSlots = await ParkingSlot.insertMany(parkingLots);
            console.log('Initial parking lot data has been seeded:', existingParkingSlots);
        } else {
            console.log('Parking lot data already exists:', existingParkingSlots);
        }

        res.status(200).json(existingParkingSlots);
    } catch (error) {
        console.error('Error fetching or seeding parking slots:', error);
        res.status(500).json({ message: 'Error fetching parking slots', error });
    }
};