const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/email');
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/me", async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Not authorized" });
  }
});

module.exports = router;