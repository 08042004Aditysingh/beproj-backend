const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // plain for testing (can hash if needed)
});

module.exports = mongoose.model("user", UserSchema);
