// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';
import VotePage from './components/VotePage';
import AnalysisPage from './components/AnalysisPage'; // Analysis chart component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/nominations" element={<StudentNomination />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/analysis" element={<AnalysisPage />} /> {/* Vote analysis route */}
      </Routes>
    </Router>
  );
};

export default App;
