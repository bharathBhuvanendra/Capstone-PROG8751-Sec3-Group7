

const API_URL = 'http://localhost:5001/api/payments';

// Function to create a new Payment Intent
export const createPaymentIntent = async (paymentIntent) => {
    // console.log(bookingData);
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
        return { success: false, message: errorData.error || 'Failed to create paymentIntent' };
      }
  
      const data = await response.json();
      return { success: true, data: data }; // Updated to correctly access the booking object
    } catch (error) {
      console.error('Error creating booking:', error);
      return { success: false, message: 'Failed to create booking' };
    }
  };
