// // server/routes/paymentIntentRoutes.js

// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // Create a Payment Intent
// router.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     // Validate the amount and currency
//     if (!amount || typeof amount !== 'number' || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid amount provided' });
//     }

//     if (!currency) {
//       return res.status(400).json({ error: 'Currency is required' });
//     }

//     // Create the PaymentIntent with the specified amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,  // Amount should be in the smallest currency unit (e.g., cents for USD)
//       currency,
//     });

//     // Send the client secret to the client to complete the payment
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// });

// module.exports = router;
