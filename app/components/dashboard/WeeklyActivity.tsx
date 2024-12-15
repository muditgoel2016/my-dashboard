import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const WeeklyActivity = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="20%"
        barGap={4}
        maxBarSize={15}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis 
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 14, fill: "#6B7280" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          ticks={[0, 100, 200, 300, 400, 500, 600]}
          domain={[0, 600]}
          tick={{ fontSize: 14, fill: "#6B7280" }}
        />
        <Legend
          align="right"
          verticalAlign="top"
          height={50}
          iconType="circle"
          iconSize={12}
          formatter={(value) => <span className="text-sm text-black">{value}</span>}
        />
        <Bar 
          name="Deposit" 
          dataKey="deposit" 
          fill="#396AFF" 
          minPointSize={7.5}
          radius={[10, 10, 10, 10]} 
        />
        <Bar 
          name="Withdraw" 
          dataKey="withdraw" 
          fill="#232323" 
          minPointSize={7.5}
          radius={[10, 10, 10, 10]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyActivity;