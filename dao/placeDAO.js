const Place = require('../models/Place'); // Import Place model

const placeDAO = {
  // Create a new place
  async create(data) {
    const place = new Place(data);
    return await place.save();
  },

  // Get all places
  async getAll() {
    return await Place.find();
  },

  // Get a place by ID
  async getById(id) {
    return await Place.findById(id);
  },

  // Update a place by ID
  async updateById(id, data) {
    return await Place.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete a place by ID
  async deleteById(id) {
    return await Place.findByIdAndDelete(id);
  }
};

module.exports = placeDAO;
