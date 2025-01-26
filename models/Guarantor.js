const mongoose = require('mongoose');

const guarantorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  CNIC: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Guarantor', guarantorSchema);
