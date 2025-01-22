const Payment = require('../models/Payment');

const paymentDAO = {
  async create(data) {
    const payment = new Payment(data);
    return await payment.save();
  },

  async getAll() {
    return await Payment.find().sort({ paymentDate: -1 });
  },

  async getById(id) {
    return await Payment.findById(id);
  },

  async updateById(id, data) {
    return await Payment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async deleteById(id) {
    return await Payment.findByIdAndDelete(id);
  },

  async getAllBusiness() {
    return await Business.find().sort({ name: 1 }); // Sort businesses alphabetically
  },

async fetchAllPayments() {
  try {
    const payments = await Payment.aggregate([
      {
        $lookup: {
          from: 'businesses', // Collection name for businesses
          localField: 'businessId',
          foreignField: '_id',
          as: 'businessDetails',
        },
      },
      {
        $unwind: {
          path: '$businessDetails',
          preserveNullAndEmptyArrays: true, // Include payments even if no business is linked
        },
      },
      {
        $lookup: {
          from: 'places', // Collection name for places
          localField: 'businessDetails.assignedPlace',
          foreignField: '_id',
          as: 'placeDetails',
        },
      },
      {
        $unwind: {
          path: '$placeDetails',
          preserveNullAndEmptyArrays: true, // Include businesses even if no place is linked
        },
      },
      {
        $project: {
          paymentDate: 1,
          paymentAmount: 1,
          paymentMethod: 1,
          month: 1,
          remarks: 1,
          'businessDetails.businessName': 1,
          'businessDetails.contactNumber': 1,
          'placeDetails.building': 1,
          'placeDetails.floor': 1,
          'placeDetails.partition': 1,
        },
      },
    ]);

    console.log('Fetched Payments:', JSON.stringify(payments, null, 2));
    return payments;
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    throw error;
  }
}

};

module.exports = paymentDAO;
