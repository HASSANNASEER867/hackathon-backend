const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  CNIC: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loanRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }]
});

module.exports = mongoose.model('User', userSchema);
