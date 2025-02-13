"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ProgressRingProps {
  value: number; // Current intake
  goal: number;  // Goal intake
  color: string; // Ring color
}

const ProgressRing: React.FC<ProgressRingProps> = ({ value, goal, color }) => {
  const progress = Math.min(value / goal, 1); 
  
  const data = [
    { name: "Filled", value: progress },
    { name: "Remaining", value: 1 - progress },
  ];

  return (
    <div className="w-[90vw] md:w-[50vw] max-w-[350px]">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="35%"
          outerRadius="50%"
          startAngle={90}
          endAngle={450}
          dataKey="value"
          stroke="none"
        >
          <Cell key="filled" fill={color} />
          <Cell key="remaining" fill="#e2e8f0" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
  );
};

export default ProgressRing;