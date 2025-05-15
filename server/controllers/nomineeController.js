const express = require('express');
const Nominee = require('../models/nominees');
const router = express.Router();

// Add nominee
router.post('/addNominee', async (req, res) => {
  const { nomineeName, year, branch, role } = req.body;

  const nominee = new Nominee({
    nomineeName,
    year,
    branch,
    role,
  });

  try {
    await nominee.save();
    res.status(200).json({ success: true, message: 'Nominee added successfully!' });
  } catch (err) {
    console.error('Error adding nominee:', err);
    res.status(500).json({ success: false, message: 'Error adding nominee.' });
  }
});

module.exports = router;
