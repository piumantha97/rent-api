const Business = require('../models/business');

const businessDAO = {
  async create(data) {
    const business = new Business(data);
    return await business.save();
  },

  async getAll() {
    return await Business.find().sort({ businessName: 1 });
  },

  async getById(id) {
    return await Business.findById(id);
  },

  async updateById(id, data) {
    return await Business.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteById(id) {
    return await Business.findByIdAndDelete(id);
  }
};

module.exports = businessDAO;