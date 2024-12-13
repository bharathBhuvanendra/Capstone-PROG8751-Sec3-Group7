const express = require('express');
const router = express.Router();
const { getParkingSlots } = require('../controllers/parkingslotController');

// Route to get all parking slots
router.get('/parkingSlots', getParkingSlots);

module.exports = router;
