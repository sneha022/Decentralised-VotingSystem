const User = require('../models/user');
const Nominee = require('../models/nominees');

const castVote = async (req, res) => {
  const { userId, nomineeId } = req.body;

  try {
    console.log('Vote request body:', req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.hasVoted) {
      return res.status(400).send('User has already voted');
    }

    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).send('Nominee not found');
    }

    // Update vote info
    user.hasVoted = true;
    user.votedFor = nomineeId;
    await user.save();

    nominee.voteCount += 1;
    await nominee.save();

    res.status(200).send('Vote successfully cast');
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).send('Error processing vote');
  }
};

module.exports = { castVote };
