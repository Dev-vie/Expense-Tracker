"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteExpense } from "@/lib/actions/expenses";
import { Expense } from "@/lib/supabase.types";
import { CATEGORY_COLORS } from "@/lib/constants";
import EditExpenseModal from "./EditExpenseModal";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FileText, Edit2, Trash2 } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteExpense(id);
      router.refresh();
    } catch (error) {
      alert("Failed to delete expense");
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="w-12 h-12 mx-auto mb-3 text-zinc-400" />
        <p className="text-zinc-600 dark:text-zinc-400">
          No expenses yet. Add your first expense above!
        </p>
      </Card>
    );
  }

  return (
    <>
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDate(expense.date)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                        CATEGORY_COLORS[expense.category] || "bg-gray-500"
                      }`}
                    >
                      {expense.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                    {expense.description || "-"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {formatAmount(expense.amount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setEditingExpense(expense)}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        disabled={deletingId === expense.id}
                        className="flex items-center gap-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>
                          {deletingId === expense.id ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
