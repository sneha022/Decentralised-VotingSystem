const Otp = require('../models/otp');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP function
function generateOtp(length = 6) {
  return crypto.randomInt(0, 10 ** length).toString().padStart(length, '0');
}

// Send email function
async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Student Voting System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Login Verification',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  console.log('Sending email to:', email);
  await transporter.sendMail(mailOptions);
}

// Send OTP controller
exports.sendOtp = async (req, res) => {
  const { email, studentId } = req.body;

  if (!email.endsWith('@bvrithyderabad.edu.in')) {
    return res.status(400).json({ success: false, message: 'Invalid email domain. Please use your college email.' });
  }

  const otp = generateOtp();

  try {
    console.log('Received request to send OTP to:', email);

    // Cleanup any existing OTPs
    await Otp.deleteMany({ email });

    const newOtp = new Otp({ email, studentId, otp });
    await newOtp.save();

    await sendEmail(email, otp);

    res.status(200).json({ success: true, message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('Error in sendOtp:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
};

// Verify OTP controller
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // Delete the OTP after verification to prevent reuse
    await Otp.findOneAndDelete({ email, otp });

    res.status(200).json({ success: true, message: 'OTP verified successfully.' });
  } catch (err) {
    console.error('OTP verification failed:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
