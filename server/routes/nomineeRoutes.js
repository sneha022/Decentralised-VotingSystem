// routes/nomineeRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Nominee = require('../models/nominees');
const router = express.Router();

// Add a nominee
router.post('/addNominee', async (req, res) => {
  const { nomineeName, year, branch, role } = req.body;

  try {
    const nominee = new Nominee({ nomineeName, year, branch, role });
    await nominee.save();
    res.status(201).json({ success: true, message: 'Nominee added successfully' });
  } catch (error) {
    console.error('Error adding nominee:', error);
    res.status(500).json({ success: false, message: 'Error adding nominee' });
  }
});

// Get all nominees
router.get('/allNominees', async (req, res) => {
  try {
    const nominees = await Nominee.find();
    res.status(200).json(nominees);
  } catch (error) {
    console.error('Error fetching nominees:', error);
    res.status(500).json({ success: false, message: 'Error fetching nominees' });
  }
});

// Handle voting for multiple roles
router.post('/vote', async (req, res) => {
  const { votes } = req.body;

  try {
    for (const role in votes) {
      const nomineeId = votes[role];

      if (!mongoose.Types.ObjectId.isValid(nomineeId)) {
        return res.status(400).json({ success: false, message: `Invalid nominee ID for role: ${role}` });
      }

      const nominee = await Nominee.findById(nomineeId);
      if (!nominee) {
        return res.status(404).json({ success: false, message: `Nominee not found for role: ${role}` });
      }

      nominee.voteCount += 1;
      await nominee.save();
    }

    res.status(200).json({ success: true, message: 'Votes recorded successfully' });
  } catch (error) {
    console.error('Error recording votes:', error);
    res.status(500).json({ success: false, message: 'Error recording votes' });
  }
});

module.exports = router;
