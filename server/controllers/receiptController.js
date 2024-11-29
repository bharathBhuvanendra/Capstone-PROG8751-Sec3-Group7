const generateParkingReceipt = require('../generateReceipt');
const sendEmailWithReceipt = require('../generateEmail'); // Import email sending functionality
const path = require('path');

exports.generateParkingReceipt = (req, res) => {
  const outputFilePath = path.join(__dirname, '../receipts/parking_receipt.pdf'); // Ensure the path is constructed correctly
  const bookingDetails = req.body.bookingDetails;
  const userEmail = req.body.userEmail;

  if (!userEmail) {
    console.error('No recipient email provided');
    return res.status(400).json({ message: 'No recipient email provided' });
  }

  // Generate parking receipt
  generateParkingReceipt(outputFilePath, bookingDetails, async (err, pdfBuffer) => {
    if (err) {
      console.error('Failed to generate receipt:', err);
      return res.status(500).json({ message: 'Failed to generate receipt' });
    }

    // Send email with the generated receipt
    try {
      await sendEmailWithReceipt(userEmail, bookingDetails);
      console.log('Email sent successfully with the receipt.');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    // Send the receipt file to the client
    res.sendFile(outputFilePath, (sendErr) => {
      if (sendErr) {
        console.error('Error sending receipt:', sendErr);
        res.status(500).json({ message: 'Failed to send receipt' });
      }
    });
  });
};
