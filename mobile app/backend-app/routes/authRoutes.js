const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Sahi path check kar le

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Database me email check kar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Password verify kar
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT Token generate kar
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
