const express = require("express");
const router = express.Router();
const Card = require("../models/Card"); // your card model

router.get("/count", async (req, res) => {
  try {
    const total = await Card.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to get card count" });
  }
});

module.exports = router;
