import React, { useMemo } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

interface ActivityData {
  name: string;
  deposit: number;
  withdraw: number;
}

interface WeeklyActivityProps {
  data: ActivityData[];
}

const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 20 };
const Y_AXIS_TICKS = [0, 100, 200, 300, 400, 500, 600];
const Y_AXIS_DOMAIN: [number, number] = [0, 600];
const BAR_RADIUS: [number, number, number, number] = [10, 10, 10, 10];

const AXIS_TICK_STYLE = { fontSize: 14, fill: '#6B7280' };

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ data }) => {
  const legendFormatter = useMemo(() => (
    (value: string) => <span className='text-sm text-black'>{value}</span>
  ), []);

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={CHART_MARGIN}
        barCategoryGap='20%'
        barGap={4}
        maxBarSize={15}>
        <CartesianGrid 
          strokeDasharray='3 3' 
          vertical={false} 
          stroke='#E5E7EB'/>
        <XAxis 
          dataKey='name'
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK_STYLE}/>
        <YAxis
          axisLine={false}
          tickLine={false}
          ticks={Y_AXIS_TICKS}
          domain={Y_AXIS_DOMAIN}
          tick={AXIS_TICK_STYLE}/>
        <Legend
          align='right'
          verticalAlign='top'
          height={50}
          iconType='circle'
          iconSize={12}
          formatter={legendFormatter}/>
        <Bar 
          name='Deposit' 
          dataKey='deposit' 
          fill='#396AFF' 
          minPointSize={7.5}
          radius={BAR_RADIUS}/>
        <Bar 
          name='Withdraw' 
          dataKey='withdraw' 
          fill='#232323' 
          minPointSize={7.5}
          radius={BAR_RADIUS}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyActivity;