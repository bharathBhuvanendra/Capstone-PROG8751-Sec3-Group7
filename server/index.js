const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());  // For parsing JSON requests


app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
}));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const parkingSlotRoutes = require('./routes/parkingslotRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/parking-slots', parkingSlotRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
