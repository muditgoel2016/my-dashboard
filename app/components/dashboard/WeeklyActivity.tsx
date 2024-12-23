import React, { useMemo } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

import type { WeeklyActivityProps } from './dashboardInterfaces';

const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 20 };
const Y_AXIS_TICKS = [0, 100, 200, 300, 400, 500, 600];
const Y_AXIS_DOMAIN: [number, number] = [0, 600];
const BAR_RADIUS: [number, number, number, number] = [10, 10, 10, 10];

const AXIS_TICK_STYLE = { fontSize: 14, fill: '#6B7280' };

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ data }) => {
  const legendFormatter = useMemo(() => (
    (value: string) => (
      <span 
        className='text-sm text-black'
        role='presentation'
        aria-label={`${value} data series`}>
        {value}
      </span>
    )
  ), []);

  // Create accessible data summary
  const chartSummary = useMemo(() => {
    const summary = data.map(item => (
      `${item.name}: Deposit $${item.deposit}, Withdraw $${item.withdraw}`
    )).join('. ');
    return `Weekly activity chart showing deposits and withdrawals. ${summary}`;
  }, [data]);

  // Create accessible wrapper component
  const AccessibleChartWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <figure
      role='img'
      aria-label='Weekly Activity Chart'
      aria-roledescription='A bar chart comparing weekly deposits and withdrawals'
      aria-details={chartSummary}>
      <div className='sr-only'>
        <h2>Weekly Activity Chart</h2>
        <p>{chartSummary}</p>
      </div>
      {children}
    </figure>
  );

  return (
    <AccessibleChartWrapper>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={data}
          margin={CHART_MARGIN}
          barCategoryGap='20%'
          barGap={4}
          maxBarSize={15}
          role='img'
          aria-roledescription='Bar chart'>
          <CartesianGrid 
            strokeDasharray='3 3' 
            vertical={false} 
            stroke='#E5E7EB'
            role='presentation'/>
          <XAxis 
            dataKey='name'
            axisLine={false}
            tickLine={false}
            tick={AXIS_TICK_STYLE}
            aria-label='Days of the week'/>
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={Y_AXIS_TICKS}
            domain={Y_AXIS_DOMAIN}
            tick={AXIS_TICK_STYLE}
            aria-label='Amount in dollars'/>
          <Legend
            align='right'
            verticalAlign='top'
            height={50}
            iconType='circle'
            iconSize={12}
            formatter={legendFormatter}
            wrapperStyle={{ margin: '0 0 10px 0' }}
            role='list'/>
          <Bar 
            name='Deposit' 
            dataKey='deposit' 
            fill='#396AFF' 
            minPointSize={7.5}
            radius={BAR_RADIUS}
            role='img'
            aria-roledescription='Bar element'
            aria-label='Deposits'/>
          <Bar 
            name='Withdraw' 
            dataKey='withdraw' 
            fill='#232323' 
            minPointSize={7.5}
            radius={BAR_RADIUS}
            role='img'
            aria-roledescription='Bar element'
            aria-label='Withdrawals'/>
        </BarChart>
      </ResponsiveContainer>
    </AccessibleChartWrapper>
  );
};

export default WeeklyActivity;