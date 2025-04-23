const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : null;
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Payload contains userId or adminId, email, role
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
