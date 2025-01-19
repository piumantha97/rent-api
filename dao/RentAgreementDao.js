const RentAgreement = require('../models/RentAgreement');
const PropertySubmission = require('../models/Property');
const rentAgreementDAO = {
  async addPayment(agreementId, paymentData) {
    const rentAgreement = await RentAgreement.findById(agreementId);

    if (!rentAgreement) {
      throw new Error('Rent agreement not found');
    }

    // Find existing payment for the month
    const existingPayment = rentAgreement.payments.find(
      (p) => p.month === paymentData.month
    );

    if (existingPayment) {
      // Update existing payment
      existingPayment.amountPaid += paymentData.amountPaid;
      existingPayment.balance = Math.max(
        0,
        rentAgreement.monthlyRent - existingPayment.amountPaid
      );
      existingPayment.paymentDate = paymentData.paymentDate; // Update payment date
    } else {
      // Add new payment record
      const balance = Math.max(0, rentAgreement.monthlyRent - paymentData.amountPaid);

      rentAgreement.payments.push({
        paymentDate: paymentData.paymentDate,
        amountPaid: paymentData.amountPaid,
        balance,
        month: paymentData.month
      });
    }

    return await rentAgreement.save();
  }
};

module.exports = rentAgreementDAO;
