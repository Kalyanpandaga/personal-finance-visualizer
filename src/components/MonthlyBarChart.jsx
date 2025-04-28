"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export function MonthlyBarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const month = format(new Date(transaction.date), "MMM yyyy");

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += transaction.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
