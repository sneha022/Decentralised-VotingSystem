const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  studentId: String,
  votedRoles: {
    type: Map,
    of: String, // nomineeId
    default: {},
  },
});

module.exports = mongoose.model('User', userSchema);
