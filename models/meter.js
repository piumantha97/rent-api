const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['Current', 'Water'] }, // Type of meter
  meterId: { type: String, required: true, unique: true }, // Unique meter ID
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }, // Assigned place
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: false }, // Assigned business (if any)
  readings: { // Historical meter readings
    type: [
      {
        date: Date,
        value: Number
      }
    ],
    default: []
  }
});

module.exports = mongoose.model('Meter', meterSchema);
