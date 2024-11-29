// server/controllers/receiptController.js
const generateParkingReceipt = require('../generateReceipt');

exports.generateParkingReceipt = (req, res) => {
  const outputFilePath = './receipts/parking_receipt.pdf';
  const bookingDetails = req.body.bookingDetails;

  if (!bookingDetails) {
    console.error('Booking details are missing');
    return res.status(400).json({ message: 'Booking details are required to generate receipt' });
  }

  // Generate the parking receipt
  generateParkingReceipt(outputFilePath, bookingDetails, (err) => {
    if (err) {
      console.error('Failed to generate receipt:', err);
      return res.status(500).json({ message: 'Failed to generate receipt' });
    }

    // Read the file and send it as a response
    res.sendFile(outputFilePath, { root: __dirname }, (err) => {
      if (err) {
        console.error('Error sending receipt:', err);
        res.status(500).json({ message: 'Failed to send receipt' });
      }
    });
  });
};
