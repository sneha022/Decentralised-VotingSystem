const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const otpRoutes = require('./routes/otpRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', otpRoutes);

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB error:', err));
