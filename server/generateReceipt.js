// server/generateReceipt.js

const PDFDocument = require('pdfkit');
const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

function generateParkingReceipt(filePath, callback) {
  const doc = new PDFDocument({
    size: [300, 600], // Set receipt size
    margins: { top: 20, bottom: 20, left: 20, right: 20 },
  });

  // Ensure output directory exists
  const outputDir = path.dirname(filePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pipe to a file
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Define the path to the icon
  const imagePath = path.resolve(__dirname, 'assets', 'Logo.png'); // Create absolute path to image

  // Get current date and time
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const currentDate = now.toLocaleDateString();

  // Header Icon and Text
  if (fs.existsSync(imagePath)) {
    try {
      doc.image(imagePath, { width: 60, align: 'center', valign: 'top' });
    } catch (err) {
      console.error('Error loading image: ', err);
    }
  } else {
    console.warn("Image not found, skipping...");
  }

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
  doc.moveDown(2);
  doc.fontSize(28).font('Helvetica-Bold').text(currentTime, { align: 'center' });

  // Date and Space Info
  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica').text(currentDate, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text('Space: 34', { align: 'center' });

  // Payment Info (Large Bold)
  doc.moveDown(2);
  doc.fontSize(24).font('Helvetica-Bold').text('Paid: $10.00', { align: 'center' });

  // Separator Line
  doc.moveTo(20, doc.y + 10).lineTo(280, doc.y + 10).dash(2, { space: 2 }).stroke();

  // Footer Message
  doc.moveDown(1.5);
  doc.fontSize(12).font('Helvetica').text('THANK YOU AND DRIVE SAFELY!', { align: 'center' });

  // Generate Barcode
  bwipjs.toBuffer(
    {
      bcid: 'code128', // Barcode type
      text: '123456789012', // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: false, // Do not include the text
    },
    (err, png) => {
      if (err) {
        console.error('Error generating barcode:', err);
        callback(err);
      } else {
        // Draw barcode onto the PDF
        const barcodeWidth = 200; // Define the barcode width
        const pageWidth = doc.page.width; // Get the page width
        const xPosition = (pageWidth - barcodeWidth) / 2; // Calculate the x position to center the barcode

        const barcodeImagePath = 'barcode.png';
        fs.writeFileSync(barcodeImagePath, png);
        doc.image(barcodeImagePath, xPosition, doc.y + 10, { width: barcodeWidth }); // Explicitly set the x position to center
        fs.unlinkSync(barcodeImagePath); // Clean up barcode image file

        // Finalize the PDF
        doc.end();
        writeStream.on('finish', () => {
          callback(null); // Invoke callback when PDF generation is complete
        });
      }
    }
  );
}

module.exports = generateParkingReceipt;
