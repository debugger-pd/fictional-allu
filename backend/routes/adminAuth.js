// routes/adminAuth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Preset admin credentials; in production, store passwords securely!
const allowedAdmins = [
  { adminId: "admin1", email: "admin1@example.com", password: "adminpass1" },
  { adminId: "admin2", email: "admin2@example.com", password: "adminpass2" }
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = allowedAdmins.find(a => a.email === email);
  if (!admin || password !== admin.password) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const payload = { adminId: admin.adminId, email: admin.email, role: "admin" };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

module.exports = router;
