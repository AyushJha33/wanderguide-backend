const Destination = require('../models/Destination');

// Get all destinations
const getDestinations = async (req, res) => {
  try {
    const { search, category, season } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (season) {
      query.bestSeason = season;
    }

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single destination
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create destination (admin only)
const createDestination = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      country,
      state,
      images,
      tags,
      bestSeason,
      coordinates
    } = req.body;

    const destination = await Destination.create({
      name,
      description,
      category,
      country,
      state,
      images,
      tags,
      bestSeason,
      location: {
        type: 'Point',
        coordinates: coordinates
      },
      createdBy: req.user._id
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update destination (admin only)
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete destination (admin only)
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get nearby destinations
const getNearbyDestinations = async (req, res) => {
  try {
    const { lng, lat, distance = 50000 } = req.query;

    const destinations = await Destination.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance)
        }
      }
    });

    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getNearbyDestinations
};