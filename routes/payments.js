const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.get("/count", async (req, res) => {
  try {
    const total = await Payment.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to get payment count" });
  }
});

module.exports = router;
