const OTP = require('../models/otp');
const nodemailer = require('nodemailer');  // If you're using email for OTP sending

// OTP Generation
const generateOTP = (length) => {
  let otp = '';
  const chars = '0123456789';
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
};

// Send OTP to email
const sendOTPEmail = async (email, otp) => {
  // Setup email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your email address
      pass: process.env.EMAIL_PASS,  // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Voting System',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// API to generate and send OTP
const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(6);  // 6-digit OTP
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 10); // OTP valid for 10 minutes

  // Save OTP to DB
  try {
    await OTP.create({ email, otp, expiration });

    // Send OTP to user's email
    await sendOTPEmail(email, otp);

    res.send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
};

// API to verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).send('Invalid OTP');
    }

    if (otpRecord.expiration < new Date()) {
      return res.status(400).send('OTP has expired');
    }

    res.send('OTP verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying OTP');
  }
};

module.exports = { sendOTP, verifyOTP };
