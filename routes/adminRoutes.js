const express = require('express');
const router = express.Router();

router.get('/applications', protect, (req, res) => {
  // Admin logic for fetching applications
});

module.exports = router;
