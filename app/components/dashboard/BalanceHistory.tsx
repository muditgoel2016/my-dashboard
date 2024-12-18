import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts';

interface BalanceHistoryData {
  month: string;
  value: number;
}

interface BalanceHistoryProps {
  data: BalanceHistoryData[];
}

const margin = { top: 20, right: 30, left: 20, bottom: 10 };
const tickStyles = { fill: '#718EBF', fontSize: 14 };
const yAxisDomain = [0, 800]; // Removed 'as const'

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data} margin={margin}>
        <defs>
          <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#4F46E5' stopOpacity={0.1} />
            <stop offset='95%' stopColor='#4F46E5' stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' horizontal vertical stroke='#E5E7EB' />
        <XAxis dataKey='month' tick={tickStyles} tickLine tickSize={8} stroke='#718EBF' dy={10} />
        <YAxis tick={tickStyles} tickLine tickSize={8} domain={yAxisDomain} stroke='#718EBF' dx={-10} />
        <Line type='monotone' dataKey='value' stroke='#4F46E5' strokeWidth={2.5} dot={false} />
        <Area type='monotone' dataKey='value' stroke={false} fillOpacity={1} fill='url(#colorValue)' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceHistory;