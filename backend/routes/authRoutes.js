const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ FIXED (correct path + naming)


// ========================
// REGISTER
// ========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ========================
// LOGIN
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ========================
// FORGOT PASSWORD
// ========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = Math.random().toString(36).substring(2);

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    res.json({
      msg: "Reset token generated",
      resetToken,
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ========================
// RESET PASSWORD
// ========================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (
      !user.resetToken ||
      user.resetToken !== token ||
      user.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ msg: "Password reset successful 🚀" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;