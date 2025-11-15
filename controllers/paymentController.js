const Payment = require("../models/Payment");
// const { Parser } = require("json2csv");
const fastcsv = require("fast-csv");

exports.savePayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    return res.json({ message: "Payment saved successfully", payment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.exportPayments=async (req, res) => {
  try {
    const payments = await Payment.find().lean();

    if (!payments || payments.length === 0) {
      // return empty CSV with headers if needed, or 204
      res.status(200);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=payments.csv");
      // If you want headers only, figure headers array
      return res.send("");
    }

    // choose columns/order you want in CSV
    const fields = Object.keys(payments[0]).filter((f) => f !== "__v"); // drop __v
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=payments.csv");

    const csvStream = fastcsv.format({ headers: fields });
    csvStream.pipe(res);

    for (const p of payments) {
      // ensure consistent shape
      const row = {}
      fields.forEach((f) => (row[f] = p[f] ?? ""))
      csvStream.write(row)
    }
    csvStream.end()
  } catch (err) {
    console.error("Export error:", err)
    res.status(500).json({ message: "Error generating CSV" })
  }
}

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Payment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
};