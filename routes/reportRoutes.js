const express = require('express');
const Agreement = require('../models/Agreement');
const Payment = require('../models/Payment');

const router = express.Router();

router.get('/unpaid-rent', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: 'month query parameter is required. Example: 2026-03' });
    }

    const agreements = await Agreement.aggregate([
      {
        $lookup: {
          from: 'businesses',
          localField: 'businessId',
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
          localField: 'placeId',
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
        $match: {
          startDate: { $lte: new Date(`${month}-31`) },
          endDate: { $gte: new Date(`${month}-01`) }
        }
      },
      {
        $project: {
          _id: 1,
          businessId: 1,
          placeId: 1,
          monthlyRent: 1,
          startDate: 1,
          endDate: 1,
          agreementType: 1,
          businessName: '$businessDetails.businessName',
          personName: '$businessDetails.personName',
          placeLabel: {
            $ifNull: [
              '$placeDetails.unitCode',
              {
                $concat: [
                  { $ifNull: ['$placeDetails.building', ''] },
                  '-',
                  { $ifNull: ['$placeDetails.floor', ''] },
                  {
                    $cond: [
                      { $ifNull: ['$placeDetails.partition', false] },
                      { $concat: ['-', '$placeDetails.partition'] },
                      ''
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    ]);

    const payments = await Payment.aggregate([
      {
        $match: {
          month
        }
      },
      {
        $group: {
          _id: '$agreementId',
          totalPaid: { $sum: '$paymentAmount' }
        }
      }
    ]);

    const paymentMap = new Map(
      payments.map((p) => [String(p._id), p.totalPaid])
    );

    const report = agreements.map((agreement) => {
      const paidAmount = paymentMap.get(String(agreement._id)) || 0;
      const balanceDue = Math.max(0, agreement.monthlyRent - paidAmount);

      let status = 'Unpaid';
      if (paidAmount >= agreement.monthlyRent) {
        status = 'Paid';
      } else if (paidAmount > 0) {
        status = 'Partial';
      }

      return {
        agreementId: agreement._id,
        businessName: agreement.businessName || 'N/A',
        personName: agreement.personName || '',
        place: agreement.placeLabel || 'N/A',
        month,
        monthlyRent: agreement.monthlyRent || 0,
        paidAmount,
        balanceDue,
        status
      };
    });

    res.status(200).json(report);
  } catch (err) {
    console.error('Error generating unpaid rent report:', err.message);
    res.status(500).json({ error: 'Failed to generate unpaid rent report' });
  }
});

module.exports = router;