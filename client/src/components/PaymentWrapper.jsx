// src/components/PaymentWrapper.jsx
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51QBC95I0HQU15HJgRKsfhJW9ojohpFPhbalJHsiseTMYaUHtISx1lDOT8SScRQFMIbzIiRUqWIZvj7ndPVXb2aRI00g3RynTFd');

const PaymentWrapper = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(1000); // Default to $10 for 1 hour

  const fetchPaymentIntent = async (amount) => {
    try {
      const response = await fetch('http://localhost:5001/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, currency: 'cad' }), // Specify the amount and currency
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  useEffect(() => {
    fetchPaymentIntent(amount);
  }, [amount]);

  return (
    clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Checkout onAmountCalculated={setAmount} />
      </Elements>
    ) : (
      <p>Loading payment details, please wait...</p>
    )
  );
};

export default PaymentWrapper;