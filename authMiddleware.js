const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Header-аас токен авах
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Токен баталгаажуулах
    req.user = decoded; // Токенд хадгалагдсан хэрэглэгчийн мэдээллийг хадгалах
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;
