import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const WeeklyActivity = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      barCategoryGap="50%"
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
      <Bar dataKey="withdraw" fill="#232323" barSize={15} radius={[10, 10, 10, 10]} />
      <Bar dataKey="deposit" fill="#396AFF" barSize={15} radius={[10, 10, 10, 10]} />
    </BarChart>
  );
};

export default WeeklyActivity;