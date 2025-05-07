const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  studentId: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 } // OTP expires after 5 mins
});

module.exports = mongoose.model('Otp', otpSchema);
