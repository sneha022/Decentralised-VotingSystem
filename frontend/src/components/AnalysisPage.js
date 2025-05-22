// src/components/AnalysisPage.js
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AnalysisPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/nominee/voteAnalysis')
      .then((res) => res.json())
      .then((result) => {
        // Transform data to flat format for the chart
        const transformed = result.map((item) => ({
          role: item._id.role,
          nomineeName: item._id.nomineeName,
          votes: item.totalVotes,
        }));
        setData(transformed);
      })
      .catch((err) => console.error('Error fetching analysis:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 className="text-2xl font-bold mb-4">Vote Analysis by Role</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <XAxis dataKey="nomineeName" angle={-30} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes" fill="#8884d8" name="Vote Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalysisPage;
