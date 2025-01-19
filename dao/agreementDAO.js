const Agreement = require('../models/Agreement');

const agreementDAO = {
  // Create a new agreement
  async create(data) {
    const agreement = new Agreement(data);
    return await agreement.save();
  },

  // Get all agreements with populated business details
  async getAll() {
    return await Agreement.find().populate('businessId');
  },
  async getAllAgreements() {

        return await Agreement.aggregate([
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
              preserveNullAndEmptyArrays: true, // Keeps agreements even if no business is found
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
              preserveNullAndEmptyArrays: true, // Keeps businesses even if no place is found
            },
          },
          {
            $project: {
              agreementType: 1,
              startDate: 1,
              endDate: 1,
              monthlyRent: 1,
              keyMoney: 1,
              businessId: 1,
              'businessDetails.businessName': 1,
              'businessDetails.contactNumber': 1,
              'placeDetails.building': 1,
              'placeDetails.floor': 1,
              'placeDetails.partition': 1,
            },
          },
        ]);
      },
      


  // Get an agreement by ID with populated business details
  async getById(id) {
    return await Agreement.findById(id).populate('businessId');
  },

  // Update an agreement by ID
  async updateById(id, data) {
    return await Agreement.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete an agreement by ID
  async deleteById(id) {
    return await Agreement.findByIdAndDelete(id);
  }
};

module.exports = agreementDAO;
