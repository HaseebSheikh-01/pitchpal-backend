const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController'); // Make sure this import is correct
const auth = require('../middleware/auth'); // Ensure the auth middleware is correctly imported

// Route for creating a new investor
router.post('/', auth, investorController.createInvestor);

// Route for getting all investors
router.get('/', auth, investorController.getInvestors);

// Route for getting matching startups for a specific investor
router.get('/matching-startups', auth, investorController.getMatchingStartups);

// Other routes (preferences, matched startups, etc.)

module.exports = router;
