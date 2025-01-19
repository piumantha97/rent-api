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
