const express = require("express");
const Card = require("../models/Card");

const router = express.Router();

// POST → Add card
router.post("/add", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.json({ success: true, card });
  } catch (err) {
    console.error("Error adding card:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// GET → Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ addedDate: -1 });
    res.json({ success: true, cards });
  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.json({ success: false, error: "Card not found" });
    }

    res.json({ success: true, card: deletedCard });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
