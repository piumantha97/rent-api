const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String },
    keyMoney: { type: Number, default: 0 },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    agreementStartDate: { type: Date, required: true },
    agreementEndDate: { type: Date, required: true },
    status: { type: String, default: 'active' },
});

module.exports = mongoose.model('Tenant', TenantSchema);
