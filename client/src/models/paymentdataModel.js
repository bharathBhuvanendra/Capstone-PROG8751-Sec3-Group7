const API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/payment-data` :  'http://localhost:5001/api/payment-data';

// Function to create a new payment
export const createPaymentData = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Failed to create payment' };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error('Error creating payment:', error);
    return { success: false, message: 'Failed to create payment' };
  }
};
