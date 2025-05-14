const express = require('express');
const router = express.Router();
const Otp = require('../models/otp');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP function
function generateOtp(length = 6) {
  return crypto.randomInt(0, 10 ** length).toString().padStart(length, '0'); // Ensures OTP is always 6 digits
}

// Send email function with error logging and TLS option for self-signed certificates
async function sendEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    const mailOptions = {
      from: `"Student Voting System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Login Verification',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    console.log('Sending email to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err; // rethrow to catch in route
  }
}

// @route POST /otp/send-otp
router.post('/send-otp', async (req, res) => {
  const { email, studentId } = req.body;

  // Validate email domain
  if (!email.endsWith('@bvrithyderabad.edu.in')) {
    return res.status(400).json({ success: false, message: 'Invalid email domain. Please use your college email.' });
  }

  const otp = generateOtp(); // Generate OTP

  try {
    console.log('Received request to send OTP to:', email);

    // Clean up old OTPs for the same email before creating a new one
    await Otp.deleteMany({ email });

    // Create and save new OTP
    const newOtp = new Otp({ email, studentId, otp });
    await newOtp.save();  // Save OTP document to MongoDB

    // Send OTP email
    await sendEmail(email, otp);
    res.status(200).json({ success: true, message: 'OTP sent to your email.' });

  } catch (err) {
    console.error('Error in /send-otp route:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
});

// @route POST /otp/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP document based on email and otp provided by user
    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // Cleanup OTP after successful verification (delete it)
    await Otp.findOneAndDelete({ email, otp });

    res.status(200).json({ success: true, message: 'OTP verified successfully.' });

  } catch (err) {
    console.error('OTP verification failed:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
