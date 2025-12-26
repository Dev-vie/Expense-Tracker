export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Personal',
  'Other',
] as const

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': 'bg-orange-500',
  'Transportation': 'bg-blue-500',
  'Shopping': 'bg-purple-500',
  'Entertainment': 'bg-pink-500',
  'Bills & Utilities': 'bg-yellow-500',
  'Healthcare': 'bg-red-500',
  'Education': 'bg-green-500',
  'Travel': 'bg-teal-500',
  'Personal': 'bg-indigo-500',
  'Other': 'bg-gray-500',
}
