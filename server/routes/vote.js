const express = require('express');
const router = express.Router();
const { castVote } = require('../controllers/voteController');

// Route to handle voting
router.post('/', castVote);

module.exports = router;
