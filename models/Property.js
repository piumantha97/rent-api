const mongoose = require('mongoose');

const propertyRentSchema = new mongoose.Schema({
  placeCode: { type: String, required: true },

  businessName: { type: String, required: true },
  fullName: { type: String, required: true },
//   telephone: { type: String, required: true, match: /^[0-9]{10}$/ },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  keyMoney: { type: Number, required: true, min: 0 },
  monthlyRent: { type: Number, required: true, min: 0 },
  description: { type: String, required: false },
//   isAvailable: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('PropertyRentDetails', propertyRentSchema);