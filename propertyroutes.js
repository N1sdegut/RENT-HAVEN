const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// Add a new property
router.post('/', async (req, res) => {
  try {
    const { title, description, price, location, landlord, images } = req.body;

    if (!title || !description || !price || !location || !landlord) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProperty = new Property({ title, description, price, location, landlord, images });
    await newProperty.save();
    res.status(201).json({ message: "Property added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add property" });
  }
});

module.exports = router;
