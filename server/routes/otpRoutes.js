const express = require('express');
const router = express.Router();
const Otp = require('../models/otp');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP
function generateOtp(length = 6) {
  return crypto.randomInt(100000, 999999).toString();
}

// Send email function
async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Student Voting System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Login Verification',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// @route POST /send-otp
router.post('/send-otp', async (req, res) => {
  const { email, studentId } = req.body;

  if (!email.endsWith('@bvrithyderabad.edu.in')) {
    return res.status(400).json({ message: 'Invalid email domain.' });
  }

  const otp = generateOtp();

  try {
    await Otp.deleteMany({ email }); // remove old OTPs
    const newOtp = new Otp({ email, studentId, otp });
    await newOtp.save();
    await sendEmail(email, otp);
    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});

// @route POST /verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.json({ success: false, message: 'Invalid or expired OTP.' });
    }

    await Otp.deleteMany({ email }); // cleanup after verification
    res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (err) {
    console.error('OTP verification failed:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
