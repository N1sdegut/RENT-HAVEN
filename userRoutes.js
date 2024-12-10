const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'You have accessed the protected route',
    user: req.user, // Токен дотор хадгалагдсан хэрэглэгчийн мэдээлэл
  });
});

module.exports = router;
