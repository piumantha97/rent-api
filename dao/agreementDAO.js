const Agreement = require('../models/Agreement');

const agreementDAO = {
  // Create a new agreement
  async create(data) {
    const agreement = new Agreement(data);
    return await agreement.save();
  },

  // Get all agreements with populate
  async getAll() {
    return await Agreement.find()
      .populate('businessId')
      .populate('placeId');
  },

  async getActiveAgreements() {
  const today = new Date();

  return await Agreement.aggregate([
    {
      $match: {
        endDate: { $gte: today }
      }
    },
    {
      $lookup: {
        from: 'businesses',
        localField: 'businessId',
        foreignField: '_id',
        as: 'businessDetails',
      },
    },
    {
      $unwind: {
        path: '$businessDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'places',
        localField: 'placeId',
        foreignField: '_id',
        as: 'placeDetails',
      },
    },
    {
      $unwind: {
        path: '$placeDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: { endDate: -1, startDate: -1 }
    }
  ]);
},
  // Get all agreements with business + place details
  async getAllAgreements() {
    return await Agreement.aggregate([
      {
        $lookup: {
          from: 'businesses',
          localField: 'businessId',
          foreignField: '_id',
          as: 'businessDetails',
        },
      },
      {
        $unwind: {
          path: '$businessDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'places',
          localField: 'placeId',
          foreignField: '_id',
          as: 'placeDetails',
        },
      },
      {
        $unwind: {
          path: '$placeDetails',
          preserveNullAndEmptyArrays: true,
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
          placeId: 1,
          'businessDetails.businessName': 1,
          'businessDetails.personName': 1,
          'businessDetails.contactNumber': 1,
          'placeDetails.building': 1,
          'placeDetails.floor': 1,
          'placeDetails.partition': 1,
          'placeDetails.unitCode': 1,
        },
      },
      {
        $sort: { endDate: 1 },
      },
    ]);
  },

  // Get agreement by ID
  async getById(id) {
    return await Agreement.findById(id)
      .populate('businessId')
      .populate('placeId');
  },

  // Update agreement
  async updateById(id, data) {
    return await Agreement.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete agreement
  async deleteById(id) {
    return await Agreement.findByIdAndDelete(id);
  },
};

module.exports = agreementDAO;