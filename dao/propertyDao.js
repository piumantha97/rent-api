const PropertySubmission = require('../models/Property');

const formDAO = {
  async create(data) {
    const submission = new PropertySubmission(data);
    return await submission.save();
  },

  async getAll() {
   return await PropertySubmission.find().sort({ endDate: -1 });
  },

  async getById(id) {
    return await PropertySubmission.findById(id);
  },

  async updateById(id, data) {
    return await PropertySubmission.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  },

  async deleteById(id) {
    return await PropertySubmission.findByIdAndDelete(id);
  }
};

module.exports = formDAO;
