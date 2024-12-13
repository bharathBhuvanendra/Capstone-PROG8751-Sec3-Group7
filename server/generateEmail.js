const nodemailer = require('nodemailer');
const generateParkingReceipt = require('./generateReceipt');
require('dotenv').config(); // Load environment variables from .env

async function sendEmailWithReceipt(userEmail, bookingDetails) {
  return new Promise((resolve, reject) => {
    generateParkingReceipt('./receipts/parking_receipt.pdf', bookingDetails, async (err, pdfBuffer) => {
      if (err) {
        console.error('Error generating receipt:', err);
        return reject(err);
      }

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
        debug: true,
        logger: true,
      });

      // Email options
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: userEmail,
        subject: 'Your Parking Receipt',
        text: 'Please find your parking receipt attached.',
        attachments: [
          {
            filename: 'parking-receipt.pdf',
            content: pdfBuffer,
          },
        ],
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        resolve(info);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        reject(emailError);
      }
    });
  });
}

module.exports = sendEmailWithReceipt;
