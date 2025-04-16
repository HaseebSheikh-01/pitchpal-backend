const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // The controller for user-related actions
const authMiddleware = require('../middleware/auth'); // Ensure the user is authenticated

// PUT /api/users/:id/role - Update user role
router.put('/:id/role', authMiddleware, userController.updateRole);

module.exports = router;
