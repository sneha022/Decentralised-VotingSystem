const User = require('../models/user');
const Nominee = require('../models/nominees');

const castVote = async (req, res) => {
  const { userId, nomineeId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).send('Nominee not found');
    }

    const role = nominee.role;

    // Check if the user has already voted for this role
    if (user.votedRoles && user.votedRoles.get(role)) {
      return res.status(400).send(`You have already voted for the role: ${role}`);
    }

    // Record vote for this role
    user.votedRoles.set(role, nomineeId);
    await user.save();

    // Increment vote count for the nominee
    nominee.voteCount += 1;
    await nominee.save();

    res.status(200).send(`Successfully voted for ${role}`);
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).send('Error processing vote');
  }
};

module.exports = { castVote };
