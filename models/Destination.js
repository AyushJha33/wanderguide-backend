const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['beach', 'mountain', 'city', 'forest', 'desert', 'cultural'],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: ''
  },
  images: [String],
  tags: [String],
  bestSeason: {
    type: String,
    enum: ['summer', 'winter', 'spring', 'autumn', 'all year'],
    default: 'all year'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

destinationSchema.index({ location: '2dsphere' });
destinationSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);