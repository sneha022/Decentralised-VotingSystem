const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  studentId: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
