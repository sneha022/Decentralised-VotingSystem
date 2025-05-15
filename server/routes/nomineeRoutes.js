const User = require('../models/user'); // make sure this is imported

router.post('/vote', async (req, res) => {
  const { nomineeId, userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.hasVoted) {
      return res.status(403).json({ success: false, message: 'User has already voted' });
    }

    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).json({ success: false, message: 'Nominee not found' });
    }

    nominee.voteCount += 1;
    await nominee.save();

    user.hasVoted = true;
    user.votedFor = nomineeId;
    await user.save();

    res.status(200).json({ success: true, message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).json({ success: false, message: 'Error recording vote' });
  }
});
