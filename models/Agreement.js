const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  agreementType: {
    type: String,
    enum: ['new', 'renewal'],
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  keyMoney: { type: Number, default: null },
  monthlyRent: { type: Number, required: true }
});

module.exports = mongoose.model('Agreement', agreementSchema);