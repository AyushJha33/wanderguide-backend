const Review = require('../models/Review');
const Destination = require('../models/Destination');

// Get all reviews for a destination
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.destinationId })
      .populate('user', 'name avatar');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a review
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const destinationId = req.params.destinationId;

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      destination: destinationId
    });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this destination' });
    }

    const review = await Review.create({
      user: req.user._id,
      destination: destinationId,
      rating,
      comment
    });

    const populated = await review.populate('user', 'name avatar');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const isOwner = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReviews, addReview, deleteReview };