import { Suspense } from "react";
import { getExpenses, getTotalSpent } from "@/lib/actions/expenses";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SpendingByCategoryChart from "@/components/SpendingByCategoryChart";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import {
  SummarySkeleton,
  ExpensesSkeleton,
} from "@/components/LoadingSkeletons";
import { DollarSign, Calendar, FileText, TrendingUp } from "lucide-react";

async function ExpensesSummary() {
  try {
    const [expenses, totalSpent] = (await Promise.all([
      getExpenses(),
      getTotalSpent(),
    ])) as any;

    // Calculate this month's total
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const thisMonthExpenses = (expenses as any[]).filter((expense: any) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === thisMonth &&
        expenseDate.getFullYear() === thisYear
      );
    });

    const thisMonthTotal = thisMonthExpenses.reduce(
      (sum: number, expense: any) => sum + Number(expense.amount),
      0
    );

    const formatAmount = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    return (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-200 rounded-xl p-6 text-white dark:text-black shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 opacity-90" />
              <p className="text-sm opacity-90">Total Spent</p>
            </div>
            <p className="text-4xl font-bold">{formatAmount(totalSpent)}</p>
            <p className="text-sm opacity-75 mt-2">
              {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}{" "}
              tracked
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 rounded-xl p-6 text-white dark:text-black shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 opacity-90" />
              <p className="text-sm opacity-90">This Month</p>
            </div>
            <p className="text-4xl font-bold">{formatAmount(thisMonthTotal)}</p>
            <p className="text-sm opacity-75 mt-2">
              {thisMonthExpenses.length}{" "}
              {thisMonthExpenses.length === 1 ? "expense" : "expenses"} in{" "}
              {now.toLocaleDateString("en-US", { month: "long" })}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-black dark:text-white" />
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Insights
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingByCategoryChart expenses={expenses} />
            <MonthlyTrendChart expenses={expenses} />
          </div>
        </div>

        {/* Expenses List */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-black dark:text-white" />
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Recent Expenses
            </h3>
          </div>
          <ExpenseList expenses={expenses} />
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-800 dark:text-red-200 font-medium mb-2">
          Failed to load expenses
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
      </div>
    );
  }
}

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          Dashboard
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Track and manage your expenses
        </p>
      </div>

      <Suspense fallback={<SummarySkeleton />}>
        <ExpensesSummary />
      </Suspense>

      {/* Add Expense Form */}
      <AddExpenseForm />
    </div>
  );
}
