// src/components/PaymentWrapper.jsx
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51QBC95I0HQU15HJgRKsfhJW9ojohpFPhbalJHsiseTMYaUHtISx1lDOT8SScRQFMIbzIiRUqWIZvj7ndPVXb2aRI00g3RynTFd');

const PaymentWrapper = () => {
  const [clientSecret, setClientSecret] = useState(null);

  // Fetch the clientSecret only once when the component mounts   
  const fetchPaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000, currency: 'cad' }), // Specify the amount and currency
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
    fetchPaymentIntent();
  }, []); // Ensure this only runs once when the component mounts

  // Only render Elements after clientSecret is fetched
  return (
    clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Checkout />
      </Elements>
    ) : (
      <p>Loading payment details, please wait...</p>
    )
  );
};

export default PaymentWrapper;
