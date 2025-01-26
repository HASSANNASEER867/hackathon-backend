const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },  // Loan period in months
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guarantors: [{
    name: String,
    email: String,
    location: String,
    CNIC: String
  }],
  status: { type: String, default: 'Pending' },  // Pending, Approved, Rejected
  tokenNumber: { type: String },
  appointmentDetails: {
    date: Date,
    time: String,
    location: String
  }
});

module.exports = mongoose.model('Loan', loanSchema);
