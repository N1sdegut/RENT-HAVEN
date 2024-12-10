const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyroutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

// Environment variables
dotenv.config();

// Create express app
const app = express();  // app-ийг энд эхлүүлэх

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../')));  // app-г эхлүүлсний дараа байршуулна

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home.html'));
});

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Алдааны статус кодыг тохируулах
  res.status(statusCode).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
