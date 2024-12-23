import React, { useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { CustomizedLabelProps, ExpenseStatisticsProps } from './dashboardInterfaces';

const RADIAN = Math.PI / 180;

const ExpenseStatistics: React.FC<ExpenseStatisticsProps> = ({ data }) => {
  const renderCustomizedLabel = useCallback(({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill='white' 
        textAnchor='middle' 
        dominantBaseline='middle'
        role='img'
        aria-label={`${name}: ${(percent * 100).toFixed(0)}%`}>
        <tspan 
          x={x} 
          y={y - 10} 
          fontSize='20' 
          fontWeight='600'>
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
        <tspan 
          x={x} 
          y={y + 10} 
          fontSize='14'>
          {name}
        </tspan>
      </text>
    );
  }, []);

  // Create accessible data summary
  const chartSummary = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const summary = data.map(item => {
      const percentage = ((item.value / total) * 100).toFixed(0);
      return `${item.name}: ${percentage}%`;
    }).join(', ');
    return `Expense distribution: ${summary}`;
  }, [data]);

  // Create accessible wrapper component
  const AccessibleChartWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <figure
      role='img'
      aria-label='Expense Statistics Chart'
      aria-roledescription='A pie chart showing expense distribution'
      aria-details={chartSummary}>
      <div className='sr-only'>
        <h2>Expense Statistics</h2>
        <p>{chartSummary}</p>
        <ul>
          {data.map(item => (
            <li key={item.name}>{item.name}: {item.value}%</li>
          ))}
        </ul>
      </div>
      {children}
    </figure>
  );

  return (
    <AccessibleChartWrapper>
      <div className='w-full h-full flex items-center justify-center'>
        <PieChart 
          width={400} 
          height={300}
          role='img'
          aria-roledescription='Pie chart'>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={140}
            innerRadius={0}
            dataKey='value'
            paddingAngle={5}
            labelLine={false}
            label={renderCustomizedLabel}
            strokeWidth={3}
            stroke='#fff'
            role='group'
            aria-label='Expense distribution segments'>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                role='img'
                aria-roledescription='Pie segment'
                aria-label={`${entry.name}: ${((entry.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%`}/>
            ))}
          </Pie>
        </PieChart>
      </div>
    </AccessibleChartWrapper>
  );
};

export default ExpenseStatistics;