// client/paymentModel.js

const API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/payments` :  'http://localhost:5001/api/payments';

// Function to create a new Payment Intent
export const createPaymentIntent = async (paymentIntent) => {
  try {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentIntent)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Failed to create payment intent' };
    }

    const data = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return { success: false, message: 'Failed to create payment intent' };
  }
};

// Function to create a new Payment
export const createPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Failed to create payment' };
    }

    const data = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error('Error creating payment:', error);
    return { success: false, message: 'Failed to create payment' };
  }
};

// Function to get payment details by booking ID
export const getPaymentByBookingId = async (bookingId) => {
  try {
    const response = await fetch(`${API_URL}/booking/${bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Failed to fetch payment details' };
    }

    const data = await response.json();
    return { success: true, payment: data };
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return { success: false, message: 'An error occurred while fetching payment details' };
  }
};
