import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const ExpenseStatistics = ({ data }) => {
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        <tspan 
          x={x} 
          y={y - 10} 
          fontSize="20" 
          fontWeight="600"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
        <tspan 
          x={x} 
          y={y + 10} 
          fontSize="14"
        >
          {name}
        </tspan>
      </text>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={140}
          innerRadius={0}
          dataKey="value"
          paddingAngle={5}
          labelLine={false}
          label={renderCustomizedLabel}
          strokeWidth={3}
          stroke="#fff"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ExpenseStatistics;