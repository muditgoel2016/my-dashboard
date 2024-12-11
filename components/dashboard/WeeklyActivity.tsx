import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const WeeklyActivity = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
      <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#6B7280" }} />
      <YAxis tick={{ fontSize: 14, fill: "#6B7280" }} domain={[0, 600]} />
      <Bar dataKey="withdraw" fill="#232323" barSize={15} radius={[10, 10, 10, 10]} />
      <Bar dataKey="deposit" fill="#396AFF" barSize={15} radius={[10, 10, 10, 10]} />
    </BarChart>
  );
};

export default WeeklyActivity;
