const express = require('express');
const businessDAO = require('../dao/businessDAO');

const router = express.Router();

// POST: Add a new business
router.post('/', async (req, res) => {
  try {
    const { assignedPlace, businessName, contactNumber, personName, personAddress, personId } = req.body;

    const businessData = {
      assignedPlace,
      businessName,
      contactNumber,
      personName,
      personAddress,
      personId
    };

    const savedBusiness = await businessDAO.create(businessData);
    res.status(201).json({ message: 'Business added successfully', business: savedBusiness });
  } catch (err) {
    console.error('Error saving business:', err.message);
    res.status(500).json({ error: 'Failed to add business' });
  }
});

// GET: Fetch all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await businessDAO.getAll();
    res.status(200).json(businesses);
  } catch (err) {
    console.error('Error fetching businesses:', err.message);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// GET: Fetch a single business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await businessDAO.getById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (err) {
    console.error('Error fetching business:', err.message);
    res.status(500).json({ error: 'Failed to fetch business' });
  }
});

// PUT: Update a business by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBusiness = await businessDAO.updateById(req.params.id, req.body);
    if (!updatedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json({ message: 'Business updated successfully', business: updatedBusiness });
  } catch (err) {
    console.error('Error updating business:', err.message);
    res.status(500).json({ error: 'Failed to update business' });
  }
});

// DELETE: Remove a business by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBusiness = await businessDAO.deleteById(req.params.id);
    if (!deletedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (err) {
    console.error('Error deleting business:', err.message);
    res.status(500).json({ error: 'Failed to delete business' });
  }
});

module.exports = router;
