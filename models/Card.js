const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  number: { type: String, required: true },
  holder: { type: String, required: true },
  expiry: { type: String, required: true },
  type: { type: String, required: true },
  gradient: { type: String, required: true },
  addedDate: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Card", CardSchema);
