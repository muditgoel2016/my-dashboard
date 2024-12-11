import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const ExpenseStatistics = ({ data }) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        outerRadius={120}
        dataKey="value"
        paddingAngle={2}
        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
          const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

          return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle">
              <tspan x={x} y={y - 10}>{`${(percent * 100).toFixed(0)}%`}</tspan>
              <tspan x={x} y={y + 10}>{name}</tspan>
            </text>
          );
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ExpenseStatistics;
