import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';

const App = () => {
  const [selectedRole, setSelectedRole] = useState(null); // State to store selected role for voting

  const handleViewPolling = (role) => {
    setSelectedRole(role); // Set selected role for polling view
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/nominations" element={<StudentNomination />} />
        {/* Removed VotePage route */}
      </Routes>
    </Router>
  );
};

export default App;
