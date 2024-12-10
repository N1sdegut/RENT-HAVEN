const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // User model-г импортоор авна
const generateToken = require('../utils/generateToken'); // Token үүсгэх тусгай функц

const router = express.Router();

// Хэрэглэгч бүртгэх (Sign Up)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Нууц үгийг шифрлэх

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id); // JWT token үүсгэх

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Хэрэглэгч нэвтрэх (Log In)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
