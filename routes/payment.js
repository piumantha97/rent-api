const express = require('express');
const paymentDAO = require('../dao/paymentDao');

const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = await paymentDAO.create(req.body);
    res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all payments
// router.get('/', async (req, res) => {
//   try {
//     const payments = await paymentDAO.getAll();
//     res.status(200).json(payments);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get a single payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await paymentDAO.getById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a payment by ID
router.put('/:id', async (req, res) => {
  try {
    const payment = await paymentDAO.updateById(req.params.id, req.body);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a payment by ID
router.delete('/:id', async (req, res) => {
  try {
    const payment = await paymentDAO.deleteById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all businesses
router.get('/businesses', async (req, res) => {
  console.log("test --------------------------ep");
  try {
    const businesses = await  paymentDAO.getAllBusiness(); // Get all businesses from the DAO
    res.status(200).json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET: Fetch all payments
router.get('/', async (req, res) => {
  try {
    console.log("payments --------------------------------------");
    const payments = await paymentDAO.fetchAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});


module.exports = router;
