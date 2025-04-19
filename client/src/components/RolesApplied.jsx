import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RolesApplied.css'; // Add this CSS file for styling

const RolesApplied = () => {
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/get-nominees');
        setNominees(res.data);
      } catch (err) {
        console.error('Error fetching nominees', err);
      }
    };

    fetchNominees();
  }, []);

  const voteForNominee = async (nomineeId) => {
    try {
      const res = await axios.post('http://localhost:5000/cast-vote', { nomineeId });
      if (res.data.success) {
        alert('Vote casted successfully!');
      }
    } catch (err) {
      alert('Error casting vote');
    }
  };

  return (
    <div className="roles-applied-container">
      <h2>Available Roles</h2>
      <div className="role-container">
        {['President', 'Vice President', 'Treasurer', 'Secretary', 'Joint Secretary'].map((role) => (
          <div key={role} className="role-card">
            <h3>{role}</h3>
            {nominees
              .filter((nominee) => nominee.role === role)
              .map((nominee) => (
                <div key={nominee.id} className="nominee-card">
                  <p>{nominee.nomineeName}</p>
                  <button onClick={() => voteForNominee(nominee.id)}>Vote</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesApplied;
