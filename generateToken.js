const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload
    process.env.JWT_SECRET, // Нууц түлхүүр
    { expiresIn: '1h' } // Хүчинтэй хугацаа
  );
};

module.exports = generateToken;
