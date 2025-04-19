import React, { useState } from 'react';
import axios from 'axios';
import './otp.css'; // optional styling file
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // optional for navigation after success

    const requestOtp = async () => {
        if (!email) {
            setMessage('Please enter a valid email.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/send-otp', { email });
            setMessage(response.data.message);
            if (response.status === 200) {
                setStep(2);
            }
        } catch (error) {
            setMessage('Failed to send OTP.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            setMessage('Please enter the OTP.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
            setMessage(response.data.message);
            if (response.status === 200) {
                // Navigate or do something on successful verification
                navigate('/success'); // Optional: create a success page route
            }
        } catch (error) {
            setMessage('OTP verification failed.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-container">
            <h1>Email OTP Verification</h1>
            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={requestOtp} disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </>
            )}
            {step === 2 && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={verifyOtp} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default OtpVerification;
