import React from 'react';
import '../styles/Checkout.css';

const ShowReceiptButton = () => {
  const handleShowReceipt = async () => {
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails')) || {};
    const userEmail = sessionStorage.getItem('userEmail'); // Retrieve the user email from sessionStorage

    if (!userEmail) {
      alert('User email is not available. Please log in.');
      return;
    }

    try {
      // Request the backend to generate the receipt
      const response = await fetch('http://localhost:5001/api/generate-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingDetails, userEmail }), // Add userEmail to the request body
      });

      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Open the PDF in a new window
        const pdfWindow = window.open();
        pdfWindow.location = url;
      } else {
        alert('Failed to generate the receipt');
      }
    } catch (error) {
      console.error('Error fetching the receipt:', error);
      alert('Error fetching the receipt');
    }
  };

  return (
    <button className='renew-button' onClick={handleShowReceipt}>
      View Receipt
    </button>
  );
};

export default ShowReceiptButton;
