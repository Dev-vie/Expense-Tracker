"use client";

import { Suspense } from "react";

export function ExpensesSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16 ml-auto animate-pulse"></div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20 ml-auto animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-200 rounded-xl p-6 text-white dark:text-black">
        <div className="h-4 bg-white/20 dark:bg-black/20 rounded w-24 mb-2 animate-pulse"></div>
        <div className="h-10 bg-white/20 dark:bg-black/20 rounded w-40 mb-3 animate-pulse"></div>
        <div className="h-4 bg-white/20 dark:bg-black/20 rounded w-32 animate-pulse"></div>
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 rounded-xl p-6 text-white dark:text-black">
        <div className="h-4 bg-white/20 dark:bg-black/20 rounded w-24 mb-2 animate-pulse"></div>
        <div className="h-10 bg-white/20 dark:bg-black/20 rounded w-40 mb-3 animate-pulse"></div>
        <div className="h-4 bg-white/20 dark:bg-black/20 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-4 animate-pulse"></div>
      <div className="h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse"></div>
    </div>
  );
}
