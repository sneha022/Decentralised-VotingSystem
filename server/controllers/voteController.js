const User = require('../models/user');
const Nominee = require('../models/nominee');

const castVote = async (req, res) => {
  const { userId, nomineeId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.hasVoted) {
      return res.status(400).send('User has already voted');
    }

    // Update user's vote status
    user.hasVoted = true;
    user.votedFor = nomineeId;
    await user.save();

    // Increment the nominee's vote count
    const nominee = await Nominee.findById(nomineeId);
    nominee.voteCount += 1;
    await nominee.save();

    res.send('Vote successfully cast');
  } catch (error) {
    res.status(500).send('Error processing vote');
  }
};

module.exports = { castVote };
