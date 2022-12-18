const express = require('express');
const router = express.Router();
const {
  updateActivity,
  updateTrip,
  createItinerary,
  getItinerary,
  getItineraries,
  deleteItinerary,
  shareItinerary,
} = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getItinerary);
router.get('', protect, getItineraries);
router.post('', protect, createItinerary);
router.patch('/:id/activity', protect, updateActivity);
router.patch('/:id/trip', protect, updateTrip);
router.patch('/:id/:userid', protect, shareItinerary);
router.delete('/:id', protect, deleteItinerary);

module.exports = router;
