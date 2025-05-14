import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email.endsWith('@bvrithyderabad.edu.in')) {
      alert('Please use your college email.');
      return;
    }

    try {
      // Corrected the URL to match the backend route for sending OTP
      const res = await axios.post('http://localhost:5000/otp/send-otp', {
        email,
        studentId,
      });
      setMessage(res.data.message);
      setShowOtpInput(true); // Show OTP input
    } catch (err) {
      console.error('Error sending OTP:', err.response || err.message);
      alert('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      // Corrected the URL to match the backend route for verifying OTP
      const res = await axios.post('http://localhost:5000/otp/verify-otp', {
        email,
        otp,
      });
      if (res.data.success) {
        alert('OTP verified successfully!');
        // After OTP verification, navigate to the vote page
        navigate('/vote');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP verification error:', err.response || err.message);
      alert('Error verifying OTP');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'studentId') setStudentId(value);
    else if (name === 'otp') setOtp(value);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your college email"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="studentId"
            value={studentId}
            onChange={handleInputChange}
            placeholder="Enter your student ID"
            required
          />
        </div>

        {!showOtpInput && (
          <button className="submit-btn" onClick={sendOtp}>
            Send OTP
          </button>
        )}

        {showOtpInput && (
          <>
            <div className="input-group">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleInputChange}
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>
            <button className="submit-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default StudentLogin;
