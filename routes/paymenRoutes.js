const express = require("express");
const router = express.Router();
// const Payment = require("../models/Payment")
const { savePayment, getPayments, exportPayments, deletePayment } = require("../controllers/paymentController");

router.post("/save", savePayment);
router.get("/all", getPayments);
router.get("/export", exportPayments);
router.delete("/delete/:id", deletePayment);

module.exports = router;
