import db from '../db/db.service';
import { Expense } from './entity/expense.entity';
import { Expense as PrismaExpense } from '@prisma/client';

// Insert a new expense into the database
export const insertExpense = async (
  expense: Expense,
): Promise<PrismaExpense> => {
  const result: PrismaExpense = await db.expense.create({
    data: {
      name: expense.name,
      amount: expense.amount,
      currency: expense.currency,
      category: expense.category,
      date: expense.date,
    },
  });
  return result as PrismaExpense;
};

// Fetch all expenses, sorted by date in descending order
export const getAllExpenses = async (): Promise<PrismaExpense[]> => {
  return (await db.expense.findMany({
    orderBy: { date: 'desc' },
  })) as PrismaExpense[];
};

// Fetch an expense by its ID
export const getExpenseById = async (
  id: number,
): Promise<PrismaExpense | null> => {
  return (await db.expense.findUnique({
    where: { id },
  })) as PrismaExpense | null;
};

// Update an expense by its ID
export const updateExpense = async (
  id: number,
  expense: Partial<Expense>,
): Promise<PrismaExpense | null> => {
  const { id: _id, ...rest } = expense; // Exclude the `id` field
  const updatedExpense: Expense | null = await db.expense.update({
    where: { id },
    data: rest,
  });
  return updatedExpense as PrismaExpense | null;
};

// Delete an expense by its ID
export const deleteExpense = async (id: number): Promise<void> => {
  await db.expense.delete({
    where: { id },
  });
};
