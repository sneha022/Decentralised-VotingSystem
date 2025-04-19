import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';
import OTPVerification from './components/OTPVerification';
import Success from './components/Success';
import VerificationSent from './components/VerificationSent'; // ✅ ADD THIS IMPORT

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/nominations" element={<StudentNomination />} />
      <Route path="/success" element={<Success />} />
      <Route path="/verification-sent" element={<VerificationSent />} /> {/* ✅ ADD THIS ROUTE */}
    </Routes>
  </Router>
);

export default App;
