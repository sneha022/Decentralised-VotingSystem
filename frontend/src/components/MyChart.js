// src/components/MyChart.js

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

function MyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MyChart;
