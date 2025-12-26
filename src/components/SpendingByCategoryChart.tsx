"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { CATEGORY_COLORS } from "@/lib/constants";

// Convert Tailwind bg classes to hex colors for recharts
const CHART_COLORS: Record<string, string> = {
  "Food & Dining": "#f97316",
  Transportation: "#3b82f6",
  Shopping: "#a855f7",
  Entertainment: "#ec4899",
  "Bills & Utilities": "#eab308",
  Healthcare: "#ef4444",
  Education: "#22c55e",
  Travel: "#14b8a6",
  Personal: "#6366f1",
  Other: "#6b7280",
};

type Expense = {
  id: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
};

type SpendingByCategoryChartProps = {
  expenses: Expense[];
};

export default function SpendingByCategoryChart({
  expenses,
}: SpendingByCategoryChartProps) {
  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.category === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({
        category: expense.category,
        value: expense.amount,
      });
    }
    return acc;
  }, [] as { category: string; value: number }[]);

  // Sort by value descending
  categoryData.sort((a, b) => b.value - a.value);

  if (categoryData.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          No expenses to display
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `$${entry.value.toFixed(0)}`}
            labelLine={false}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[entry.category] || "#6b7280"}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) =>
              `$${(value ?? 0).toFixed(2)}`
            }
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
