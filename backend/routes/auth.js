const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registration for normal users.
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check for existing user.
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    
    // Hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user with role 'user'.
    user = new User({ username, email, password: hashedPassword, role: 'user' });
    await user.save();
    
    const payload = { userId: user._id, role: user.role };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login for both normal and admin users.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (email === adminEmail && password === adminPassword) {
      const payload = { adminId: "admin1", email, role: "admin" };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        return res.json({ token, role: "admin" });
      });
      return;
    }
    
    // Normal user login.
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
    const payload = { userId: user._id, role: user.role };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
