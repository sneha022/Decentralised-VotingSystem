const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const otpRoutes = require('./routes/otpRoutes');
const nomineeRoutes = require('./routes/nominees');
const voteRoutes = require('./routes/vote');
const resultsRoutes = require('./routes/results');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Enable CORS for the frontend
app.use(express.json());

// Routes
app.use('/otp', otpRoutes);  // Route for OTP verification
app.use('/nominees', nomineeRoutes);  // Route for getting nominees
app.use('/vote', voteRoutes);  // Route for voting
app.use('/results', resultsRoutes);  // Route for viewing voting results

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Start server after successful connection
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Global Error Handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit the process to avoid unpredictable behavior
});
