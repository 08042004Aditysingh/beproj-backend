const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const cardroutes = require("./routes/cards");
const paymentRoutes = require("./routes/paymenRoutes");

const cardRoutes=require("./routes/cardRoutes")
const authRoutes = require("./routes/auth");
dotenv.config();

// const payment=require("./routes/paymenRoutes")


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/cards", cardRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/auth", authRoutes);
// app.use("/api/caards", cardroutes);
// app.use("/api/payments", payment);

app.get("/", (req, res) => res.send("Server Running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
