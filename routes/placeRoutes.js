const express = require('express');
const placeDAO = require('../dao/placeDAO'); // Import Place DAO

const router = express.Router();

// POST: Add a new place
router.post('/', async (req, res) => {
  try {
    const {
      building,
      floor,
      partition,
      currentMeter,
      waterMeter,
      squareFeet,
      address
    } = req.body;

    const placeData = {
      building,
      floor,
      partition: partition || null, // Null if partition is not provided
      currentMeter,
      waterMeter,
      squareFeet,
      address: address || '' // Empty string if address is not provided
    };

    const savedPlace = await placeDAO.create(placeData);
    res.status(201).json({ message: 'Place added successfully', place: savedPlace });
  } catch (err) {
    console.error('Error saving place:', err.message);
    res.status(500).json({ error: 'Failed to add place' });
  }
});

// GET: Fetch all places
router.get('/', async (req, res) => {
  try {
    const places = await placeDAO.getAll();
    res.status(200).json(places);
  } catch (err) {
    console.error('Error fetching places:', err.message);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// GET: Fetch a single place by ID
router.get('/:id', async (req, res) => {
  try {
    const place = await placeDAO.getById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (err) {
    console.error('Error fetching place:', err.message);
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

// PUT: Update a place by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlace = await placeDAO.updateById(req.params.id, req.body);
    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({ message: 'Place updated successfully', place: updatedPlace });
  } catch (err) {
    console.error('Error updating place:', err.message);
    res.status(500).json({ error: 'Failed to update place' });
  }
});

// DELETE: Remove a place by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlace = await placeDAO.deleteById(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (err) {
    console.error('Error deleting place:', err.message);
    res.status(500).json({ error: 'Failed to delete place' });
  }
});

module.exports = router;
