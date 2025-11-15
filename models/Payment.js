const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: String,
  recipientName: String,
  recipientEmail: String,
  cardNumber: String,
  cardExpiry: String,
  cardCVV: String,
  selectedCard: String,
  transactionId: String,
  timestamp: String,
});

module.exports = mongoose.model("Payment", paymentSchema);
