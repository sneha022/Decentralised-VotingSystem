const mongoose = require('mongoose');

// OTP Schema Definition
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  studentId: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // OTP expires after 5 mins
});

// Create a TTL index explicitly (not necessary if the `expires` option is used on a field, but good for clarity)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Model Export
module.exports = mongoose.model('Otp', otpSchema);
