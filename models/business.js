

const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    personName: { type: String, required: true, trim: true },
    personAddress: { type: String, default: '', trim: true },
    personId: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);