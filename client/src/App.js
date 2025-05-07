import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';

const App = () => {
  const [selectedRole, setSelectedRole] = useState(null); // New state for selected role for polling

  const handleViewPolling = (role) => {
    setSelectedRole(role); // Set selected role for polling view
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/nominations" element={<StudentNomination />} />
      </Routes>
    </Router>
  );
};

export default App;
