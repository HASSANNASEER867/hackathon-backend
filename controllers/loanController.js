const Loan = require('../models/Loan');
const QRCode = require('qr-image');

const requestLoan = async (req, res) => {
  const { category, subcategory, loanAmount, loanPeriod } = req.body;
  const user = req.user;

  const loan = new Loan({
    category,
    subcategory,
    loanAmount,
    loanPeriod,
    user: user._id
  });

  await loan.save();

  // Generate QR code
  const qrCode = QRCode.imageSync(`Loan ID: ${loan._id}`, { type: 'png' });

  res.status(201).json({
    message: 'Loan request submitted successfully',
    loan,
    qrCode
  });
};

module.exports = { requestLoan };
