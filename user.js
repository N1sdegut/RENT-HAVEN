const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Жишээ нь хэрэглэгчийн үүргийг заах
});

// Нууц үг хадгалахаас өмнө шифрлэх
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Нууц үг өөрчлөгдөөгүй бол үргэлжлүүлэх
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Нууц үг баталгаажуулах функц
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
