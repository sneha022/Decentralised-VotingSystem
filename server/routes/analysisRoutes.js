const express = require('express');
const Nominee = require('../models/nominees');
const router = express.Router();

// Route to fetch vote counts grouped by role
router.get('/voteAnalysis', async (req, res) => {
  try {
    const analysis = await Nominee.aggregate([
      {
        $group: {
          _id: { role: '$role', nomineeName: '$nomineeName' },
          votes: { $sum: '$voteCount' }
        }
      },
      {
        $group: {
          _id: '$_id.role',
          nominees: {
            $push: {
              nomineeName: '$_id.nomineeName',
              votes: '$votes'
            }
          }
        }
      }
    ]);
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error fetching vote analysis:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch vote analysis' });
  }
});

module.exports = router;
