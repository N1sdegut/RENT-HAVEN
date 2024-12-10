const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB холболтыг хийх
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // эдгээр тохиргоонуудыг устгаарай
      // useUnifiedTopology: true, // эдгээр тохиргоонуудыг устгаарай
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Хэрэв амжилтгүй бол серверийг зогсооно
  }
};

module.exports = connectDB;
