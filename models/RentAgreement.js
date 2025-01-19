const mongoose = require('mongoose');

const rentAgreementSchema = new mongoose.Schema({
  placeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Place', 
    required: true 
  }, // Rented place
  businessId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Business', 
    required: true 
  }, // Renting business
  startDate: { type: Date, required: true }, // Start date of the agreement
  endDate: { type: Date, required: true }, // End date of the agreement
  monthlyRent: { type: Number, required: true }, // Monthly rent
  keyMoney: { type: Number, required: false, min: 0 }, // Key money
  meters: { // Utility meter details
    currentMeter: { type: String, required: true },
    waterMeter: { type: String, required: true }
  },
  renewalHistory: { 
    type: [
      {
        startDate: Date,
        endDate: Date,
        monthlyRent: Number
      }
    ], 
    default: [] 
  }, // Renewal history
  isActive: { type: Boolean, default: true }, // If the agreement is active
  payments: { // Payment tracking
    type: [
      {
        paymentDate: { type: Date, required: true }, // Date of payment
        amountPaid: { type: Number, required: true, min: 0 }, // Amount paid
        balance: { type: Number, required: true, min: 0 }, // Remaining balance
        month: { type: String, required: true } // Month and year (e.g., "2025-01")
      }
    ], 
    default: []
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RentAgreement', rentAgreementSchema);
