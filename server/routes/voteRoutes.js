const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');  // Assume you have a Vote model tracking user votes
const Nominee = require('../models/nominees');

router.post('/vote', async (req, res) => {
  const { nomineeId, email, studentId } = req.body;

  if (!nomineeId || !email || !studentId) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Check if user already voted
    const existingVote = await Vote.findOne({ email });
    if (existingVote) {
      return res.status(400).json({ success: false, message: 'You have already voted.' });
    }

    // Register the vote
    const vote = new Vote({ email, studentId, nomineeId });
    await vote.save();

    // Optionally increment nominee's vote count here or later on "View Analysis"
    // Example: increment vote count immediately
    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).json({ success: false, message: 'Nominee not found' });
    }
    nominee.voteCount = (nominee.voteCount || 0) + 1;
    await nominee.save();

    return res.status(200).json({ success: true, message: 'Vote submitted successfully' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
