const express = require('express');
const router = express.Router();
const startupController = require('../controllers/startupController'); // Import controller
const authMiddleware = require('../middleware/auth'); // Import authentication middleware

// POST - Create a new startup
router.post('/', authMiddleware, startupController.createStartup); // Protected route

// GET - Get all startups for the logged-in user
router.get('/', authMiddleware, startupController.getAllStartups); // Protected route

// GET - Get a single startup by ID
router.get('/:id', authMiddleware, startupController.getStartupById); // Protected route

// PUT - Update a startup
router.put('/:id', authMiddleware, startupController.updateStartup); // Protected route

// DELETE - Delete a startup
router.delete('/:id', authMiddleware, startupController.deleteStartup); // Protected route

module.exports = router;
