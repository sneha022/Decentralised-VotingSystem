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
const nomineeRoutes = require('./routes/nomineeRoutes');  // Includes nominee & voting operations
const voteRoutes = require('./routes/voteRoutes');        // Separate vote routes

// Use Routes
app.use('/api/otp', otpRoutes);         // OTP verification routes
app.use('/api/nominee', nomineeRoutes); // Nominee management & vote counting
app.use('/api/vote', voteRoutes);       // Voting routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
