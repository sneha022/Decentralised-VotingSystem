const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  otpVerified: Boolean,
  hasVoted: { type: Boolean, default: false },
  votedFor: mongoose.Schema.Types.ObjectId, // Reference to the nominee
});

const User = mongoose.model('User', userSchema);
module.exports = User;
