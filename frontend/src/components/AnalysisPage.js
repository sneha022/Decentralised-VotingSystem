import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { v4 as uuidv4 } from 'uuid';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a0522d', '#8dd1e1'];

const AnalysisPage = () => {
  const [chartData, setChartData] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/nominee/voteAnalysis')
      .then((res) => res.json())
      .then((result) => {
        const roleSet = new Set();
        const nomineeMap = {};

        result.forEach(item => {
          const { role, nomineeName } = item._id;
          const votes = item.totalVotes;

          roleSet.add(role);

          if (!nomineeMap[nomineeName]) {
            nomineeMap[nomineeName] = { name: nomineeName };
          }

          nomineeMap[nomineeName][role] = votes;
        });

        setRoles(Array.from(roleSet));
        setChartData(Object.values(nomineeMap));
      })
      .catch(err => console.error('Error fetching analysis:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', width: '100%', overflowX: 'auto' }}>
      <h2 className="text-3xl font-bold mb-6 text-center">🗳️ Role-wise Voting Analysis</h2>

      <div style={{ minWidth: '1300px' }}>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 80, left: 30, bottom: 60 }}
            barCategoryGap={60}  // space between nominee groups
            barGap={3}           // space between bars within group
          >
            <XAxis
  dataKey="name"
  angle={0}                      // Keep names straight
  textAnchor="middle"           // Centered under the bar
  tick={{ fontSize: 15 }}
  height={40}                   // Less vertical space below axis
/>

            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            {roles.map((role, index) => (
              <Bar
  key={uuidv4()}
  dataKey={role}
  fill={COLORS[index % COLORS.length]}
  name={role}
  barSize={42}
  label={{ position: 'top', fontSize: 12 }} // Shows value on top of the bar
/>

            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisPage;
