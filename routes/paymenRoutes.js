const express = require("express");
const router = express.Router();
// const Payment = require("../models/Payment")
const { savePayment, getPayments, exportPayments } = require("../controllers/paymentController");

router.post("/save", savePayment);
router.get("/all", getPayments);
router.get("/export", exportPayments);

module.exports = router;
