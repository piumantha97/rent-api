// const mongoose = require('mongoose');

// const businessSchema = new mongoose.Schema({
//   assignedPlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }, // Reference to the place
//   businessName: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   personName: { type: String, required: true },
//   personAddress: { type: String },
//   personId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Business', businessSchema);


const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  assignedPlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }, // Reference Place
  contactNumber: { type: String, required: true },
  personName: { type: String, required: true },
  personAddress: { type: String },
  personId: { type: String, required: true },
});

module.exports = mongoose.model('Business', businessSchema);
