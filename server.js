const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Wishlist = require('./models/Wishlist');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Wishlist routes inline
app.get('/api/wishlist', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('destinations');
    if (!wishlist) wishlist = { destinations: [] };
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/wishlist', protect, async (req, res) => {
  try {
    const { destinationId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, destinations: [destinationId] });
    } else {
      if (wishlist.destinations.includes(destinationId)) {
        return res.status(400).json({ message: 'Already in wishlist' });
      }
      wishlist.destinations.push(destinationId);
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/wishlist/:destinationId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    wishlist.destinations = wishlist.destinations.filter(
      (id) => id.toString() !== req.params.destinationId
    );
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Travel Guide API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});