// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   paymentDate: { type: Date, required: true },
//   paymentAmount: { type: Number, required: true, min: 0 },
//   paymentMethod: { type: String, required: true, enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Other'] },
//   month: { type: String, required: true }, // Add this field to store the payment month
//   businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agreement', required: true }, // Reference to Agreement
//   place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }, // Reference to Place
//   remarks: { type: String, required: false }
// });


// module.exports = mongoose.model('Payment', paymentSchema);
const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   paymentDate: { type: Date, required: true },
//   paymentAmount: { type: Number, required: true, min: 0 },
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Other'],
//   },
//   businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }, // Reference Business
//   remarks: { type: String },
// });

// module.exports = mongoose.model('Payment', paymentSchema);


const paymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, required: true },
  paymentAmount: { type: Number, required: true, min: 0 },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Other'],
  },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: false }, // Reference Business
  place: { type: String, required: false }, // Change to String

  remarks: { type: String },
  month: { type: String },
});

module.exports = mongoose.model('Payment', paymentSchema);
