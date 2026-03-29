const Payment = require('../models/Payment');
const Business = require('../models/business');

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
    return await Payment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  },

  async deleteById(id) {
    return await Payment.findByIdAndDelete(id);
  },

  async getAllBusiness() {
    return await Business.find().sort({ businessName: 1 });
  },

  async fetchAllPayments() {
    try {
      const payments = await Payment.aggregate([
        {
          $lookup: {
            from: 'agreements',
            localField: 'agreementId',
            foreignField: '_id',
            as: 'agreementDetails'
          }
        },
        {
          $unwind: {
            path: '$agreementDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'businesses',
            localField: 'agreementDetails.businessId',
            foreignField: '_id',
            as: 'businessDetails'
          }
        },
        {
          $unwind: {
            path: '$businessDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'places',
            localField: 'agreementDetails.placeId',
            foreignField: '_id',
            as: 'placeDetails'
          }
        },
        {
          $unwind: {
            path: '$placeDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            paymentDate: 1,
            paymentAmount: 1,
            paymentMethod: 1,
            remarks: 1,
            month: 1,
            agreementId: 1,
            'businessDetails._id': 1,
            'businessDetails.businessName': 1,
            'placeDetails.building': 1,
            'placeDetails.floor': 1,
            'placeDetails.partition': 1,
            'placeDetails.unitCode': 1
          }
        },
        {
          $sort: { paymentDate: -1 }
        }
      ]);

      return payments;
    } catch (error) {
      console.error('Error fetching payments:', error.message);
      throw error;
    }
  }
};

module.exports = paymentDAO;