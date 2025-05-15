// models/vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  nomineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nominee', required: true },
  votedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', voteSchema);
