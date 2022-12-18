const express = require('express');
const router = express.Router();
const { getTours } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTours);

module.exports = router;
