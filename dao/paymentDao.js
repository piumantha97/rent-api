const Payment = require('../models/Payment');

const paymentDAO = {
  async create(data) {
    const payment = new Payment(data);
    return await payment.save();
  },

  async getAll() {
    return await Payment.find().sort({ paymentDate: -1 });
  },

  async getById(id) {
    return await Payment.findById(id);
  },

  async updateById(id, data) {
    return await Payment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async deleteById(id) {
    return await Payment.findByIdAndDelete(id);
  },

  async getAllBusiness() {
    return await Business.find().sort({ name: 1 }); // Sort businesses alphabetically
  },

// Fetch all payments with populated fields
// async fetchAllPayments() {
//   try {

//     const payments = await Payment.find()
//       .populate({
//         path: 'businessId', // Assuming businessId is a reference
//         select: 'businessName assignedPlace', // Select only required fields
//         populate: { path: 'assignedPlace', select: 'building floor partition' },
//       });

//     // Log the payments data to the console
//     console.log("Fetched Payments:", JSON.stringify(payments, null, 2));

//     return payments;
//   } catch (error) {
//     console.error("Error fetching payments:", error.message);
//     throw error; // Re-throw the error to handle it at a higher level
//   }
// }

async fetchAllPayments() {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'businessId',
        select: 'businessName assignedPlace', // Select businessName and assignedPlace
        populate: {
          path: 'assignedPlace',
          select: 'building floor partition', // Nested populate for assignedPlace
        },
      })
      .populate('place', 'building floor partition'); // Populate place separately if needed

    console.log('Fetched Payments:', JSON.stringify(payments, null, 2));
    return payments;
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    throw error;
  }
}


};

module.exports = paymentDAO;
