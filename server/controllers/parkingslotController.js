const ParkingSlot = require('../models/ParkingSlots');

// Create a new parking slot
exports.createParkingSlot = async (req, res) => {
  try {
    const newSlot = new ParkingSlot(req.body);
    const slot = await newSlot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all parking slots
exports.getParkingSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a parking slot by ID
exports.getParkingSlotById = async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a parking slot by ID
exports.updateParkingSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a parking slot by ID
exports.deleteParkingSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndDelete(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json({ message: 'Parking Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
