const PDFDocument = require('pdfkit');
const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

function generateParkingReceipt(filePath, bookingDetails, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Expected callback to be a function');
  }

  const doc = new PDFDocument({
    size: [300, 600], // Set receipt size
    margins: { top: 20, bottom: 20, left: 20, right: 20 },
  });

  // Ensure output directory exists
  const outputDir = path.dirname(filePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pipe to a file for saving
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Use a memory buffer for email
  const buffers = [];
  doc.on('data', (chunk) => buffers.push(chunk));
  doc.on('end', () => {
    const pdfBuffer = Buffer.concat(buffers);
    callback(null, pdfBuffer); // Ensure callback is called only once
  });

  // Header Icon and Text
  const imagePath = path.resolve(__dirname, 'assets', 'Logo.png'); // Create absolute path to image

  if (fs.existsSync(imagePath)) {
    try {
      doc.image(imagePath, { width: 60, align: 'center', valign: 'top' });
    } catch (err) {
      console.error('Error loading image: ', err);
    }
  } else {
    console.warn('Image not found, skipping...');
  }

  // Content of the PDF
  doc.moveDown(0.5);
  doc.fontSize(18).font('Helvetica-Bold').text('PARK-A-Lot', { align: 'center' });
  doc.fontSize(12).font('Helvetica').text('Kitchener, ON', { align: 'center' });
  doc.moveDown(3);

  // Separator Line
  doc.moveTo(20, doc.y).lineTo(280, doc.y).dash(2, { space: 2 }).stroke();

  // Parking Receipt Title
  doc.moveDown(2);
  doc.fontSize(14).font('Helvetica-Bold').text('PARKING RECEIPT', { align: 'center' });

  // Separator Line
  doc.moveTo(20, doc.y + 5).lineTo(280, doc.y + 5).dash(2, { space: 2 }).stroke();

  // Time Information (Large Bold)
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const currentDate = now.toLocaleDateString();

  doc.moveDown(2);
  doc.fontSize(28).font('Helvetica-Bold').text(currentTime, { align: 'center' });

  // Date and Space Info
  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica').text(currentDate, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(`Slot: ${bookingDetails.slot || 'N/A'}`, { align: 'center' });

  // Booking Duration and Car Info
  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica').text(`Booking Duration: ${bookingDetails.bookingDuration || 0} hours`, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(`Plate Number: ${bookingDetails.plateNumber || 'N/A'}`, { align: 'center' });

  // Payment Info (Large Bold)
  doc.moveDown(2);
  doc.fontSize(24).font('Helvetica-Bold').text(`Paid: $${(bookingDetails.amount || 0).toFixed(2)}`, { align: 'center' });

  // Separator Line
  doc.moveTo(20, doc.y + 10).lineTo(280, doc.y + 10).dash(2, { space: 2 }).stroke();

  // Footer Message
  doc.moveDown(1.5);
  doc.fontSize(12).font('Helvetica').text('THANK YOU AND DRIVE SAFELY!', { align: 'center' });

  // Generate Barcode
  bwipjs.toBuffer(
    {
      bcid: 'code128',
      text: bookingDetails.plateNumber || '123456789012',
      scale: 3,
      height: 10,
      includetext: false,
    },
    (err, png) => {
      if (err) {
        console.error('Error generating barcode:', err);
        callback(err);
      } else {
        // Draw barcode onto the PDF
        const barcodeWidth = 200;
        const pageWidth = doc.page.width;
        const xPosition = (pageWidth - barcodeWidth) / 2;

        doc.image(png, xPosition, doc.y + 10, { width: barcodeWidth });
        doc.end(); // Finalize the PDF
      }
    }
  );

  // Ensure the write stream is finalized
  writeStream.on('finish', () => {
    console.log(`PDF successfully saved to ${filePath}`);
  });
}

module.exports = generateParkingReceipt;
