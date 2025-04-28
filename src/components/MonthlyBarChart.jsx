"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function MonthlyBarChart({ transactions }) {
  const monthlyTotals = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount;
  });

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
