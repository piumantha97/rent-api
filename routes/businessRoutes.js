const express = require('express');
const router = express.Router(); // ✅ define router
const businessDAO = require('../dao/businessDAO');

// POST: Add business
router.post('/', async (req, res) => {
  try {
    const {
      businessName,
      contactNumber,
      personName,
      personAddress,
      personId
    } = req.body;

    const savedBusiness = await businessDAO.create({
      businessName,
      contactNumber,
      personName,
      personAddress,
      personId
    });

    res.status(201).json(savedBusiness);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add business' });
  }
});

// GET all
router.get('/', async (req, res) => {
  try {
    const businesses = await businessDAO.getAll();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IMPORTANT
module.exports = router; // ✅ also required