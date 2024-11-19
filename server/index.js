// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());  // For parsing JSON requests

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const parkingSlotRoutes = require('./routes/parkingslotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Import the payment routes
// const paymentIntentRoutes = require('./routes/paymentIntentRoutes'); // Import paymentIntent routes

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/parking-slots', parkingSlotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
// app.use('/api/payment-intents', paymentIntentRoutes); // Use paymentIntent routes

// Debug route to verify server is running
app.get('/api/debug', (req, res) => {
  res.send("API is working correctly");
});

// Handle 404 for undefined API routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
