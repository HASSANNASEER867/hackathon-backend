const express = require('express');
const { requestLoan } = require('../controllers/loanController');
const protect = require('../utils/authMiddleware');
const router = express.Router();

router.post('/request', protect, requestLoan);

module.exports = router;
