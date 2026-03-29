const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  building: { type: String, required: true },
  floor: { type: String, required: true },
  partition: { type: String, default: null },
  unitCode: { type: String, required: true, unique: true },
  currentMeter: { type: String, required: true },
  waterMeter: { type: String, required: true },
  squareFeet: { type: Number, required: true },
  address: { type: String, default: '' },
  status: {
    type: String,
    enum: ['vacant', 'occupied', 'inactive'],
    default: 'vacant'
  }
});

module.exports = mongoose.model('Place', placeSchema);