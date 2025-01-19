const Business = require('../models/business');

const businessDAO = {
  // Create a new business
  async create(data) {
    const business = new Business(data);
    return await business.save();
  },

  // Get all businesses
  async getAll() {
    return await Business.find().populate('assignedPlace');
  },

  // Get a business by ID
  async getById(id) {
    return await Business.findById(id).populate('assignedPlace');
  },

  // Update a business by ID
  async updateById(id, data) {
    return await Business.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete a business by ID
  async deleteById(id) {
    return await Business.findByIdAndDelete(id);
  }
};

module.exports = businessDAO;
