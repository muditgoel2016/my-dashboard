import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts';

import type { BalanceHistoryProps } from './dashboardInterfaces';

const margin = { top: 20, right: 30, left: 20, bottom: 10 } as const;
const tickStyles = { fill: '#718EBF', fontSize: 14 } as const;
const yAxisDomain = [0, 800];

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ 
  data,
  height = 300,
  gradientColor = '#4F46E5',
  lineColor = '#4F46E5',
  title = 'Balance History',
  description = 'Line chart showing balance history over time'
}) => {
  if (!data.length) {
    return null;
  }

  // Create accessible text summary of the data
  const dataSummary = data.map(point => 
    `${point.month}: $${point.value}`
  ).join(', ');

  return (
    <div 
      role='figure' 
      aria-label={title}
      aria-roledescription={description}>
      <ResponsiveContainer width='100%' height={height}>
        <LineChart
          data={data}
          margin={margin}
          role='img'
          aria-hidden='true'>
          <defs>
            <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={gradientColor} stopOpacity={0.2} />
              <stop offset='95%' stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray='3 3' 
            horizontal 
            vertical 
            stroke='#E5E7EB'/>
          <XAxis 
            dataKey='month' 
            tick={tickStyles} 
            tickLine 
            tickSize={8} 
            stroke='#718EBF' 
            dy={10}
            label={{ value: 'Month', position: 'bottom', offset: 0 }}/>
          <YAxis 
            tick={tickStyles} 
            tickLine 
            tickSize={8} 
            domain={yAxisDomain} 
            stroke='#718EBF' 
            dx={-10}
            label={{ value: 'Balance ($)', angle: -90, position: 'left', offset: 0 }}/>
          <Area 
            type='monotone' 
            dataKey='value' 
            stroke='none'
            fillOpacity={1} 
            fill='url(#colorValue)'/>
          <Line 
            type='monotone' 
            dataKey='value' 
            stroke={lineColor} 
            strokeWidth={2.5} 
            dot={false}/>
          <Area 
            type='monotone' 
            dataKey='value' 
            stroke='none'
            fillOpacity={1} 
            fill='url(#colorValue)'/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceHistory;