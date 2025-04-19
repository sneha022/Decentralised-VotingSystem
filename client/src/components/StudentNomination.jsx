import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentNomination.css';

const StudentNomination = () => {
  const [nomineeName, setNomineeName] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/submit-nomination', {
        nomineeName,
        year,
        branch,
        role,
      });
      if (res.data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting nomination', err);
    }
  };

  return (
    <div className="nomination-container">
      <div className="form-container">
        <h2>Nominate Yourself</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="nomineeName">Name of Nominee</label>
            <input
              type="text"
              id="nomineeName"
              placeholder="Enter nominee's name"
              value={nomineeName}
              onChange={(e) => setNomineeName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="year">Year of Study</label>
            <input
              type="text"
              id="year"
              placeholder="Enter your year of study"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              placeholder="Enter your branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Secretary">Secretary</option>
              <option value="Joint Secretary">Joint Secretary</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Submit Nomination</button>
        </form>

        {isSubmitted && (
          <div className="popup">
            <p>Your application has been successfully submitted!</p>
          </div>
        )}

        <div className="navigation-buttons">
          <button className="nav-btn back-btn" onClick={() => navigate('/welcome')}>
            ⬅️ Back
          </button>
          <button className="nav-btn next-btn" onClick={() => navigate('/roles-applied')}>
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentNomination;
