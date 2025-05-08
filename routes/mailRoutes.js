const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/contact-startup', mailController.contactStartup);

module.exports = router; 