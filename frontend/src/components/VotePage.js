import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VotePage.css';

function VotePage() {
  const [nominees, setNominees] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState('');
  const [message, setMessage] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const studentId = localStorage.getItem('studentId');

  // Redirect if not logged in
  useEffect(() => {
    if (!email || !studentId) {
      alert('You must log in first.');
      navigate('/login');
    }
  }, [email, studentId, navigate]);

  // Load vote status for specific student
  useEffect(() => {
    const voted = localStorage.getItem(`hasVoted_${studentId}`);
    if (voted === 'true') setHasVoted(true);
    else setHasVoted(false);
  }, [studentId]);

  // Fetch nominees
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/nominee/allNominees');
        if (res.data && Array.isArray(res.data)) {
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

  // Handle vote submission
  const handleVote = async () => {
    if (!selectedNominee) {
      alert('Please select a nominee to vote.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/vote/vote', {
        nomineeId: selectedNominee,
        email,
        studentId,
      });

      if (res.data.success) {
        setMessage('✅ Your vote has been successfully submitted!');
        setHasVoted(true);
        localStorage.setItem(`hasVoted_${studentId}`, 'true');
      } else {
        setMessage('⚠️ You have already voted or an issue occurred.');
      }
    } catch (err) {
      console.error('Vote error:', err);
      setMessage('❌ Failed to submit vote.');
    }
  };

  // Handle view analysis
  const handleViewAnalysis = async () => {
    if (!hasVoted) {
      alert('Please vote first to view analysis.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/nominee/incrementVote', {
        nomineeId: selectedNominee,
      });
      navigate('/analysis');
    } catch (err) {
      console.error('Error updating vote count for analysis:', err);
      alert('Error while updating vote count.');
    }
  };

  return (
    <div className="vote-container">
      <h1 className="vote-quote">
        🗳️ "Voting is the expression of our commitment to ourselves, one another, this country, and this world."
      </h1>
      <h2 className="vote-title">Cast Your Vote for a Better Tomorrow</h2>

      {message && <p className="vote-message">{message}</p>}

      {nominees.length > 0 ? (
        <div className="nominee-list-horizontal">
          {nominees.map((nominee) => (
            <div key={nominee._id} className="nominee-card">
              <input
                type="radio"
                id={nominee._id}
                name="nominee"
                value={nominee._id}
                onChange={() => setSelectedNominee(nominee._id)}
                disabled={hasVoted}
              />
              <label htmlFor={nominee._id}>
                <strong>{nominee.nomineeName}</strong><br />
                <span className="nominee-detail">Role: {nominee.role}</span><br />
                <span className="nominee-detail">Year: {nominee.year}</span><br />
                <span className="nominee-detail">Branch: {nominee.branch}</span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading nominees...</p>
      )}

      <div className="vote-buttons">
        <button className="vote-btn" onClick={handleVote} disabled={hasVoted || !selectedNominee}>
          Submit Vote
        </button>
        <button className="analysis-btn" onClick={handleViewAnalysis} disabled={!hasVoted}>
          View Analysis
        </button>
      </div>
    </div>
  );
}

export default VotePage;
