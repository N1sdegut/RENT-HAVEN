const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: { type: [String], default: [] },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
