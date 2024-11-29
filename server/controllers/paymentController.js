// server/controllers/paymentController.js

// Import stripe using the secret key from environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Allow CORS
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5001', // Replace with your frontend origin
};

exports.createPaymentIntent = [cors(corsOptions), async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Validation to ensure amount and currency are provided
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' });
    }

    // Ensure the amount is passed as an integer (smallest unit - cents for USD)
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    // Create the PaymentIntent with the provided amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Must be in the smallest currency unit (e.g., 5000 for $50.00)
      currency,
    });
console.log(paymentIntent);
    // Respond with the client secret key for Stripe Elements
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}];
