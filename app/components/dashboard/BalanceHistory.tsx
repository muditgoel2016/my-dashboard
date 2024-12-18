import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts';

const BalanceHistory = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <defs>
          <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#4F46E5' stopOpacity={0.1} />
            <stop offset='95%' stopColor='#4F46E5' stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' horizontal vertical stroke='#E5E7EB' />
        <XAxis
          dataKey='month'
          tick={{ fill: '#718EBF', fontSize: 14 }}
          tickLine
          tickSize={8}
          stroke='#718EBF'
          dy={10}/>
        <YAxis
          tick={{ fill: '#718EBF', fontSize: 14 }}
          tickLine
          tickSize={8}
          domain={[0, 800]}
          stroke='#718EBF'
          dx={-10}/>
        <Line type='monotone' dataKey='value' stroke='#4F46E5' strokeWidth={2.5} dot={false} />
        <Area type='monotone' dataKey='value' stroke={false} fillOpacity={1} fill='url(#colorValue)' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceHistory;