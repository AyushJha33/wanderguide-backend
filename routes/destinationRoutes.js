const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getNearbyDestinations
} = require('../controllers/destinationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getDestinations);
router.get('/nearby', getNearbyDestinations);
router.get('/:id', getDestinationById);
router.post('/', protect, adminOnly, createDestination);
router.put('/:id', protect, adminOnly, updateDestination);
router.delete('/:id', protect, adminOnly, deleteDestination);

module.exports = router;