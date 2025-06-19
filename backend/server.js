const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/quizapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(5000, () => console.log("Server running on port 5000"));