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

// // Configure CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://park-a-lot-capstone.netlify.app/'],  // Allow requests from this origin
//   methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
//   credentials: true, // Allow cookies if needed
//   allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
  
// }));

// Allow requests from multiple origins
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://dev-local--park-a-lot-capstone.netlify.app/', // Netlify preview
  'https://park-a-lot-capstone.netlify.app', // Netlify deployment
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://park-a-lot-capstone.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const parkingSlotRoutes = require('./routes/parkingslotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); 
const paymentdataRoutes = require('./routes/paymentdataRoutes');
const receiptController = require('./controllers/receiptController');  // Make sure this import is correct

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/parking-slots', parkingSlotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments/create-payment-intent', paymentRoutes);
app.use('/api/payment-data', paymentdataRoutes);

// Receipt generation route
app.post('/api/generate-receipt', receiptController.generateParkingReceipt);

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
