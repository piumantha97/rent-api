// const mongoose = require('mongoose');

// const placeSchema = new mongoose.Schema({
//   building: { type: String, required: true }, // Building identifier (e.g., A, B, C, D)
//   floor: { type: String, required: true }, // Floor number
//   partition: { type: String, default: null }, // Partition (optional)
//   currentMeter: { type: String, required: true }, // Current meter ID
//   waterMeter: { type: String, required: true }, // Water meter ID
//   squareFeet: { type: Number, required: true, min: 1 }, // Size in square feet
//   address: { type: String, default: '' }, // Address (optional)
//   createdAt: { type: Date, default: Date.now } // Timestamp
// });

// module.exports = mongoose.model('Place', placeSchema);

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  building: { type: String, required: true },
  floor: { type: String, required: true },
  partition: { type: String },
  currentMeter: { type: String },
  waterMeter: { type: String },
  squareFeet: { type: Number },
  address: { type: String },
});

module.exports = mongoose.model('Place', placeSchema);
