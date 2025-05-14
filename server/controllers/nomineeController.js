const Nominee = require('../models/nominee');

const getNominees = async (req, res) => {
  try {
    const nominees = await Nominee.find();
    res.json(nominees);
  } catch (error) {
    res.status(500).send('Error fetching nominees');
  }
};

module.exports = { getNominees };
