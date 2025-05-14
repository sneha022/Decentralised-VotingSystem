const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  voteCount: { type: Number, default: 0 },
  otherDetails: String,
});

const Nominee = mongoose.model('Nominee', nomineeSchema);
module.exports = Nominee;
