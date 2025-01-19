const express = require('express');
const agreementDAO = require('../dao/agreementDAO');
const router = express.Router();

// Add a new agreement
router.post('/', async (req, res) => {
  try {
    const { businessId, agreementType, startDate, endDate, keyMoney, monthlyRent } = req.body;

    const agreementData = {
      businessId,
      agreementType,
      startDate,
      endDate,
      keyMoney,
      monthlyRent
    };

    const savedAgreement = await agreementDAO.create(agreementData);
    res.status(201).json({ message: 'Agreement added successfully', agreement: savedAgreement });
  } catch (err) {
    console.error('Error saving agreement:', err.message);
    res.status(500).json({ error: 'Failed to save agreement' });
  }
});



// Get all agreements
router.get('/', async (req, res) => {
  try {
    const agreements = await agreementDAO.getAll();
    res.status(200).json(agreements);
  } catch (err) {
    console.error('Error fetching agreements:', err.message);
    res.status(500).json({ error: 'Failed to fetch agreements' });
  }
});

// Get an agreement by ID
router.get('/:id', async (req, res) => {
  try {
    const agreement = await agreementDAO.getById(req.params.id);
    if (!agreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json(agreement);
  } catch (err) {
    console.error('Error fetching agreement:', err.message);
    res.status(500).json({ error: 'Failed to fetch agreement' });
  }
});

// Update an agreement by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAgreement = await agreementDAO.updateById(req.params.id, req.body);
    if (!updatedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json({ message: 'Agreement updated successfully', agreement: updatedAgreement });
  } catch (err) {
    console.error('Error updating agreement:', err.message);
    res.status(500).json({ error: 'Failed to update agreement' });
  }
});

// Delete an agreement by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAgreement = await agreementDAO.deleteById(req.params.id);
    if (!deletedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json({ message: 'Agreement deleted successfully' });
  } catch (err) {
    console.error('Error deleting agreement:', err.message);
    res.status(500).json({ error: 'Failed to delete agreement' });
  }
});

module.exports = router;
