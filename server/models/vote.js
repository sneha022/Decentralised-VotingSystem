const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  email: String,
  studentId: String,
  nomineeId: mongoose.Schema.Types.ObjectId,
  role: String,
});

module.exports = mongoose.model('Vote', voteSchema);
