const express = require('express');
const propertyRentDAO = require('../dao/propertyDao');

const router = express.Router();

// Create a new property rent record
router.post('/', async (req, res) => {
  try {
    const propertyRent = await propertyRentDAO.create(req.body);
    res.status(201).json({ message: 'Property rent details submitted successfully', propertyRent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all property rent records
router.get('/', async (req, res) => {
  try {
    const propertyRents = await propertyRentDAO.getAll();
    res.status(200).json(propertyRents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single property rent record by ID
router.get('/:id', async (req, res) => {
  try {
    const propertyRent = await propertyRentDAO.getById(req.params.id);
    if (!propertyRent) {
      return res.status(404).json({ message: 'Property rent details not found' });
    }
    res.status(200).json(propertyRent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a property rent record by ID
router.put('/:id', async (req, res) => {
  try {
    const propertyRent = await propertyRentDAO.updateById(req.params.id, req.body);
    if (!propertyRent) {
      return res.status(404).json({ message: 'Property rent details not found' });
    }
    res.status(200).json({ message: 'Property rent details updated successfully', propertyRent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a property rent record by ID
router.delete('/:id', async (req, res) => {
  try {
    const propertyRent = await propertyRentDAO.deleteById(req.params.id);
    if (!propertyRent) {
      return res.status(404).json({ message: 'Property rent details not found' });
    }
    res.status(200).json({ message: 'Property rent details deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
