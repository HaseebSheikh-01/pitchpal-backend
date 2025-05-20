const express = require('express');
const router = express.Router();
const startupInteractionController = require('../controllers/startupInteractionController');

// GET routes for fetching counts
router.get('/:startupId', startupInteractionController.getInteractionCounts); // Get all counts
router.get('/:startupId/left-swipe', startupInteractionController.getLeftSwipes); // Get left swipes count
router.get('/:startupId/right-swipe', startupInteractionController.getRightSwipes); // Get right swipes count
router.get('/:startupId/view', startupInteractionController.getViews); // Get views count

// POST routes for incrementing counts
router.post('/:startupId/left-swipe', startupInteractionController.incrementLeftSwipe);
router.post('/:startupId/right-swipe', startupInteractionController.incrementRightSwipe);
router.post('/:startupId/view', startupInteractionController.incrementViews);

module.exports = router;