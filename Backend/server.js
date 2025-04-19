const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Store OTPs temporarily in memory (in app.locals)
app.locals.otpDatabase = {}; // OTP storage accessible throughout the app

// ✅ Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

// ✅ Generate secure OTP
function generateOTP(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

// ✅ Route to send OTP
app.post('/api/send-otp', async (req, res) => {
  const { email, studentId } = req.body;

  if (!email.endsWith('@bvrithyderabad.edu.in')) {
    return res.status(400).json({ success: false, message: 'Only BVRIT emails are allowed!' });
  }

  const otp = generateOTP();
  const otpDatabase = req.app.locals.otpDatabase; // Access from app.locals
  otpDatabase[email] = otp;

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'Your BVRIT Student Voting OTP',
    text: `Hello! Your OTP for BVRIT Student Voting is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// ✅ Route to verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const otpDatabase = req.app.locals.otpDatabase; // Access from app.locals

  // Check if OTP exists for the email
  if (!otpDatabase[email]) {
    return res.status(400).json({ success: false, message: 'OTP not sent to this email.' });
  }

  // Verify OTP
  if (otpDatabase[email] === otp) {
    // OTP is correct, delete OTP from database (for security reasons)
    delete otpDatabase[email];
    res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
