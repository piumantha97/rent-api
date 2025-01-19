const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  agreementType: { type: String, enum: ['new', 'renewal'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  keyMoney: { type: Number, default: null },
  monthlyRent: { type: Number, required: true },
  renewalHistory: [
    {
      renewedOn: { type: Date, default: Date.now },
      oldEndDate: { type: Date },
      newEndDate: { type: Date },
      oldRent: { type: Number },
      newRent: { type: Number }
    }
  ]
});

module.exports = mongoose.model('Agreement', agreementSchema);
