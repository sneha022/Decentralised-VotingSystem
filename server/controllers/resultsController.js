const Nominee = require('../models/nominee');

const getResults = async (req, res) => {
  try {
    const nominees = await Nominee.find().sort({ voteCount: -1 });
    res.json(nominees);
  } catch (error) {
    res.status(500).send('Error fetching vote results');
  }
};

module.exports = { getResults };
