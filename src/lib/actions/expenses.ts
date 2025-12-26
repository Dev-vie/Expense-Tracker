'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../supabaseServer'
import { getUser } from '../auth'
import { ExpenseInsert, ExpenseUpdate } from '../supabase.types'

export async function getExpenses() {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getExpenseById(id: string) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createExpense(expense: Omit<ExpenseInsert, 'user_id'>) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('expenses')
    .insert({
      ...expense,
      user_id: user.id,
    } as any)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  return data
}

export async function updateExpense(id: string, expense: ExpenseUpdate) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  // First verify the expense belongs to the user
  const { data: existing } = (await supabase
    .from('expenses')
    .select('user_id')
    .eq('id', id)
    .single()) as any

  if (!existing || existing.user_id !== user.id) {
    throw new Error('Unauthorized or expense not found')
  }
  const { data, error } = (await (supabase
    .from('expenses') as any)
    .update(expense)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single())

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  return data
}

export async function deleteExpense(id: string) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getTotalSpent() {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { data, error } = (await supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', user.id)) as any

  if (error) {
    throw new Error(error.message)
  }

  const total = (data as any[]).reduce((sum: number, expense: any) => sum + Number(expense.amount), 0)
  return total
}

export async function getExpensesByCategory() {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const supabase = await createClient()

  const { data, error } = (await supabase
    .from('expenses')
    .select('category, amount')
    .eq('user_id', user.id)) as any

  if (error) {
    throw new Error(error.message)
  }

  // Group by category
  const categoryTotals = {} as Record<string, number>
  (data as any[]).forEach((expense: any) => {
    const category = expense.category || 'Uncategorized'
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(expense.amount)
  })

  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
  }))
}
