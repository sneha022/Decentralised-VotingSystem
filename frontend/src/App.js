import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';
import VotePage from './components/VotePage'; // ✅ Add this import

const App = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/nominations" element={<StudentNomination />} />
        <Route path="/vote" element={<VotePage />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
};

export default App;
