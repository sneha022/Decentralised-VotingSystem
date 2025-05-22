const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const otpRoutes = require('./routes/otpRoutes');
const nomineeRoutes = require('./routes/nomineeRoutes');  // Nominee & voting routes
const voteRoutes = require('./routes/voteRoutes');        // Separate analysis route if needed

// Use Routes
app.use('/api/otp', otpRoutes);
app.use('/api/nominee', nomineeRoutes);
app.use('/api/vote', voteRoutes); // This should include vote count analysis route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
