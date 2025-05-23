import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VotePage.css';

function VotePage() {
  const [nominees, setNominees] = useState([]);
  const [selectedNominees, setSelectedNominees] = useState({});
  const [message, setMessage] = useState('');
  const [hasVotedRoles, setHasVotedRoles] = useState({});
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!email || !studentId) {
      alert('You must log in first.');
      navigate('/login');
    }
  }, [email, studentId, navigate]);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/nominee/allNominees');
        if (Array.isArray(res.data)) {
          setNominees(res.data);
        } else {
          setMessage('No nominees found.');
        }
      } catch (err) {
        console.error('Error fetching nominees:', err);
        setMessage('Failed to load nominees.');
      }
    };
    fetchNominees();
  }, []);

  const nomineesByRole = nominees.reduce((acc, nominee) => {
    acc[nominee.role] = acc[nominee.role] || [];
    acc[nominee.role].push(nominee);
    return acc;
  }, {});

  // Add all roles here including Treasurer
  const allRoles = ['President', 'Vice President', 'Secretary', 'Joint Secretary', 'Treasurer'];

  // Map over allRoles to maintain order and include empty arrays if no nominees
  const sortedNomineesByRole = allRoles.map(role => [role, nomineesByRole[role] || []]);

  useEffect(() => {
    const votedRolesJSON = localStorage.getItem(`hasVotedRoles_${studentId}`);
    if (votedRolesJSON) {
      setHasVotedRoles(JSON.parse(votedRolesJSON));
    }
  }, [studentId]);

  const handleSelectNominee = (role, nomineeId) => {
    setSelectedNominees((prev) => ({
      ...prev,
      [role]: nomineeId,
    }));
  };

  const handleVote = async () => {
    const roles = allRoles;

    for (const role of roles) {
      if (!selectedNominees[role]) {
        alert(`Please select a nominee for the role: ${role}`);
        return;
      }
      if (hasVotedRoles[role]) {
        alert(`You have already voted for the role: ${role}`);
        return;
      }
    }

    try {
      for (const role of roles) {
        const nomineeId = selectedNominees[role];
        const votePayload = { email, studentId, nomineeId, role };

        const res = await axios.post('http://localhost:5000/api/nominee/vote', votePayload);
        if (!res.data.success) {
          throw new Error(`Failed to vote for ${role}`);
        }
      }

      const updatedVotedRoles = { ...hasVotedRoles };
      roles.forEach((role) => {
        updatedVotedRoles[role] = true;
      });
      setHasVotedRoles(updatedVotedRoles);
      localStorage.setItem(`hasVotedRoles_${studentId}`, JSON.stringify(updatedVotedRoles));

      setMessage('✅ Your votes have been successfully submitted!');
    } catch (err) {
      console.error('Vote error:', err.response || err.message);
      setMessage('❌ Failed to submit votes. Please try again.');
    }
  };

  // Wrap roles in a div with some padding and overflow control

return (
  <div className="vote-container">
    <h1 className="vote-quote">
      🗳️ "Voting is the expression of our commitment to ourselves, one another, this country, and this world."
    </h1>
    <h2 className="vote-title">Cast Your Vote for a Better Tomorrow</h2>

    {message && <p className="vote-message">{message}</p>}

    <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', paddingRight: '8px' }}>
      {sortedNomineesByRole.map(([role, nominees]) => (
        <div key={role} className="role-section">
          <h3>{role}</h3>
          <div className="nominee-list-horizontal">
            {nominees.length > 0 ? (
              nominees.map((nominee) => (
                <div key={nominee._id} className="nominee-card">
                  <input
                    type="radio"
                    id={`${role}-${nominee._id}`}
                    name={role}
                    value={nominee._id}
                    onChange={() => handleSelectNominee(role, nominee._id)}
                    disabled={hasVotedRoles[role]}
                    checked={selectedNominees[role] === nominee._id}
                  />
                  <label htmlFor={`${role}-${nominee._id}`}>
                    <strong>{nominee.nomineeName}</strong><br />
                    <span className="nominee-detail">Year: {nominee.year}</span><br />
                    <span className="nominee-detail">Branch: {nominee.branch}</span>
                  </label>
                </div>
              ))
            ) : (
              <p className="no-nominees-msg">No nominees available for this role.</p>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="vote-buttons">
      <button
        className="vote-btn"
        onClick={handleVote}
        disabled={Object.keys(hasVotedRoles).length === allRoles.length}
      >
        Submit Votes
      </button>

      <button
        className="vote-btn view-analysis-btn"
        onClick={() => navigate('/analysis')}
        style={{ marginLeft: '10px' }}
      >
        View Analysis
      </button>
    </div>
  </div>
);

}

export default VotePage;
