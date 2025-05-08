const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const auth = require('../middleware/auth');

// Route for creating a new investor
router.post('/', auth, investorController.createInvestor);

// Route for getting all investors
router.get('/investors', auth, investorController.getInvestors);

// Route for matching startups by userId
router.get('/:userId/match', auth, investorController.matchStartupsByUserId);

// Route for getting an investor by userId
router.get('/:userId', auth, investorController.getInvestorByUserId);

// Route for updating investor details by userId
router.put('/:userId', auth, investorController.updateInvestor);

module.exports = router;
