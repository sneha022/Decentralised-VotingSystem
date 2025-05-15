// models/nominee.js
const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  nomineeName: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  role: { type: String, required: true },
  voteCount: { type: Number, default: 0 },  // 👈 NEW: vote count field
});

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;
