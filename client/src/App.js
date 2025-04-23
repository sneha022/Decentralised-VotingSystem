import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentNomination from './components/StudentNomination';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/nominations" element={<StudentNomination />} />
    </Routes>
  </Router>
);

export default App;
