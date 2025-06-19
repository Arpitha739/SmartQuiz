const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});

router.post("/history", async (req, res) => {
  const { token, category, score } = req.body;
  const decoded = jwt.verify(token, "secret123");
  const user = await User.findById(decoded.id);
  user.history.push({ category, score });
  await user.save();
  res.json({ message: "Score saved" });
});

router.post("/get-history", async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, "secret123");
  const user = await User.findById(decoded.id);
  res.json(user.history);
});

module.exports = router;
