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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNomineeSubmit = async (e) => {
    e.preventDefault();

    if (!nomineeName || !year || !branch || !role) {
      alert('All fields are required!');
      return;
    }

    const nomineeData = {
      nomineeName,
      year,
      branch,
      role,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/nominee/addNominee', nomineeData);

      if (res.data.success) {
        alert('Nominee added successfully!');
        setIsSubmitted(true);
      } else {
        alert('Error adding nominee.');
      }
    } catch (err) {
      console.error('Error submitting nominee:', err);
      setError('Error submitting nominee, please try again later.');
    }
  };

  return (
    <div className="nomination-container">
      <div className="form-container">
        <h2>Nominate Yourself</h2>
        <form onSubmit={handleNomineeSubmit}>
          <div className="input-field">
            <label htmlFor="nomineeName">Name of Nominee</label>
            <input
              type="text"
              id="nomineeName"
              placeholder="Enter nominee's name"
              value={nomineeName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setNomineeName(value);
                }
              }}
            />
          </div>

          <div className="input-field">
            <label htmlFor="year">Year of Study</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          <div className="input-field">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="AIML">AIML</option>
            </select>
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

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNomination;
