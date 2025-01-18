const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    address: { type: String, required: true },
    type: { type: String, default: 'apartment' },
    monthlyRent: { type: Number, required: true },
});

module.exports = mongoose.model('Property', PropertySchema);
