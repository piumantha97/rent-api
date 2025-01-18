const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    paymentDate: { type: Date, default: Date.now },
    amountPaid: { type: Number, required: true },
    balanceDue: { type: Number, default: 0 },
});

module.exports = mongoose.model('Payment', PaymentSchema);
