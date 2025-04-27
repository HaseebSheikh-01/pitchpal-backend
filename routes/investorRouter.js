// routes/investorRouter.js
const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const auth = require('../middleware/auth'); // Ensure the user is authenticated

// Create a new investor
router.post('/', auth, investorController.createInvestor);

// Get all investors
router.get('/investors', auth, investorController.getInvestors);

module.exports = router;
