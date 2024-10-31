const express = require('express');
const router = express.Router();
const parkingSlotController = require('../controllers/parkingSlotController');

// Create a new parking slot
router.post('/', parkingSlotController.createParkingSlot);

// Get all parking slots
router.get('/', parkingSlotController.getParkingSlots);

// Get a parking slot by ID
router.get('/:id', parkingSlotController.getParkingSlotById);

// Update a parking slot by ID
router.put('/:id', parkingSlotController.updateParkingSlot);

// Delete a parking slot by ID
router.delete('/:id', parkingSlotController.deleteParkingSlot);

module.exports = router;
