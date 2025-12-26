"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

type Expense = {
  id: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
};

type MonthlyTrendChartProps = {
  expenses: Expense[];
};

export default function MonthlyTrendChart({
  expenses,
}: MonthlyTrendChartProps) {
  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const existing = acc.find((item) => item.month === monthKey);
    if (existing) {
      existing.total += expense.amount;
      existing.count += 1;
    } else {
      acc.push({
        month: monthKey,
        total: expense.amount,
        count: 1,
      });
    }
    return acc;
  }, [] as { month: string; total: number; count: number }[]);

  // Sort by month ascending
  monthlyData.sort((a, b) => a.month.localeCompare(b.month));

  // Take last 12 months
  const last12Months = monthlyData.slice(-12);

  // Format month for display (e.g., "2024-12" -> "Dec 24")
  const formattedData = last12Months.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const yearShort = year.slice(-2);

    return {
      ...item,
      displayMonth: `${monthName} ${yearShort}`,
    };
  });

  if (formattedData.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Spending Trend</h2>
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          No expenses to display
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Spending Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="displayMonth"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number | undefined) => [
              `$${(value ?? 0).toFixed(2)}`,
              "Total",
            ]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Spent"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
