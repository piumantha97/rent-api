const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

/**
 * GET /api/income/monthly?year=2026
 * Monthly income summary
 */
router.get('/monthly', async (req, res) => {
  try {
    const { year } = req.query;

    const matchStage = {};

    if (year) {
      matchStage.month = { $regex: `^${year}` };
    }

    const report = await Payment.aggregate([
      {
        $match: matchStage
      },
      {
        $group: {
          _id: '$month',
          totalIncome: { $sum: '$paymentAmount' },
          paymentCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalIncome: 1,
          paymentCount: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    res.status(200).json(report);
  } catch (err) {
    console.error('Error generating monthly income report:', err.message);
    res.status(500).json({ error: 'Failed to generate monthly income report' });
  }
});

/**
 * GET /api/income/yearly
 * Yearly income summary
 */
router.get('/yearly', async (req, res) => {
  try {
    const report = await Payment.aggregate([
      {
        $project: {
          year: { $substr: ['$month', 0, 4] },
          paymentAmount: 1
        }
      },
      {
        $group: {
          _id: '$year',
          totalIncome: { $sum: '$paymentAmount' },
          paymentCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
          totalIncome: 1,
          paymentCount: 1
        }
      },
      {
        $sort: { year: 1 }
      }
    ]);

    res.status(200).json(report);
  } catch (err) {
    console.error('Error generating yearly income report:', err.message);
    res.status(500).json({ error: 'Failed to generate yearly income report' });
  }
});

/**
 * GET /api/income/by-business?month=2026-03
 * GET /api/income/by-business?year=2026
 * Income grouped by business
 */
router.get('/by-business', async (req, res) => {
  try {
    const { month, year } = req.query;

    const matchStage = {};

    if (month) {
      matchStage.month = month;
    } else if (year) {
      matchStage.month = { $regex: `^${year}` };
    }

    const report = await Payment.aggregate([
      {
        $match: matchStage
      },
      {
        $lookup: {
          from: 'agreements',
          localField: 'agreementId',
          foreignField: '_id',
          as: 'agreementDetails'
        }
      },
      {
        $unwind: {
          path: '$agreementDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'businesses',
          localField: 'agreementDetails.businessId',
          foreignField: '_id',
          as: 'businessDetails'
        }
      },
      {
        $unwind: {
          path: '$businessDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'places',
          localField: 'agreementDetails.placeId',
          foreignField: '_id',
          as: 'placeDetails'
        }
      },
      {
        $unwind: {
          path: '$placeDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$businessDetails._id',
          businessName: { $first: '$businessDetails.businessName' },
          placeUnitCode: { $first: '$placeDetails.unitCode' },
          building: { $first: '$placeDetails.building' },
          floor: { $first: '$placeDetails.floor' },
          partition: { $first: '$placeDetails.partition' },
          totalIncome: { $sum: '$paymentAmount' },
          paymentCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          businessId: '$_id',
          businessName: { $ifNull: ['$businessName', 'N/A'] },
          place: {
            $cond: [
              { $ifNull: ['$placeUnitCode', false] },
              '$placeUnitCode',
              {
                $concat: [
                  { $ifNull: ['$building', ''] },
                  '-',
                  { $ifNull: ['$floor', ''] },
                  {
                    $cond: [
                      { $ifNull: ['$partition', false] },
                      { $concat: ['-', '$partition'] },
                      ''
                    ]
                  }
                ]
              }
            ]
          },
          totalIncome: 1,
          paymentCount: 1
        }
      },
      {
        $sort: { totalIncome: -1 }
      }
    ]);

    res.status(200).json(report);
  } catch (err) {
    console.error('Error generating business income report:', err.message);
    res.status(500).json({ error: 'Failed to generate business income report' });
  }
});

/**
 * GET /api/income/dashboard?month=2026-03
 * Summary cards for dashboard
 */
router.get('/dashboard', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        error: 'month query parameter is required. Example: 2026-03'
      });
    }

    const monthlyResult = await Payment.aggregate([
      {
        $match: { month }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$paymentAmount' },
          paymentCount: { $sum: 1 }
        }
      }
    ]);

    const totalIncome = monthlyResult[0]?.totalIncome || 0;
    const paymentCount = monthlyResult[0]?.paymentCount || 0;

    res.status(200).json({
      month,
      totalIncome,
      paymentCount
    });
  } catch (err) {
    console.error('Error generating income dashboard:', err.message);
    res.status(500).json({ error: 'Failed to generate income dashboard' });
  }
});

module.exports = router;