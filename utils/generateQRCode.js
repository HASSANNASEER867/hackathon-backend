const QRCode = require('qrcode');

// Function to generate QR code from a string (e.g., loan application token)
function generateQRCode(data) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(data, (err, url) => {
            if (err) {
                reject('Error generating QR code');
            } else {
                resolve(url); // Return the QR code as a data URL
            }
        });
    });
}

module.exports = generateQRCode;
