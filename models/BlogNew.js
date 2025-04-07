const mongoose = require('mongoose');

const blogNewSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.BlogNew || mongoose.model('BlogNew', blogNewSchema);