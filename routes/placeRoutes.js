const express = require('express');
const placeDAO = require('../dao/placeDAO');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      building,
      floor,
      partition,
      currentMeter,
      waterMeter,
      squareFeet,
      address,
      status
    } = req.body;

    const unitCode = `${building}-${floor}${partition ? `-${partition}` : ''}`;

    const placeData = {
      building,
      floor,
      partition: partition || null,
      unitCode,
      currentMeter,
      waterMeter,
      squareFeet,
      address: address || '',
      status: status || 'vacant'
    };

    const savedPlace = await placeDAO.create(placeData);

    res.status(201).json({
      message: 'Place added successfully',
      place: savedPlace
    });
  } catch (err) {
    console.error('Error saving place:', err.message);
    res.status(500).json({ error: 'Failed to add place' });
  }
});

router.get('/', async (req, res) => {
  try {
    const places = await placeDAO.getAll();
    res.status(200).json(places);
  } catch (err) {
    console.error('Error fetching places:', err.message);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const updatedPlace = await placeDAO.updateById(req.params.id, req.body);
    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({
      message: 'Place updated successfully',
      place: updatedPlace
    });
  } catch (err) {
    console.error('Error updating place:', err.message);
    res.status(500).json({ error: 'Failed to update place' });
  }
});

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