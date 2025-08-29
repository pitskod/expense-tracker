import {
  insertExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from './expenses.repository';
import { Expense } from './entity/expense.entity';

// Create and persist a new expense
export const createExpense = async (expense: Expense): Promise<Expense> => {
  return await insertExpense(expense);
};

// Retrieve all expenses
export const listExpenses = async (
  limit?: number,
  offset?: number,
  fromDate?: Date,
  toDate?: Date,
): Promise<Expense[]> => {
  return await getAllExpenses(limit, offset, fromDate, toDate);
};

// Retrieve an expense by its ID
export const getExpense = async (id: number): Promise<Expense | null> => {
  return await getExpenseById(id);
};

// Update an existing expense
export const updateExpenseById = async (
  id: number,
  expense: Partial<Expense>,
): Promise<Expense | null> => {
  return await updateExpense(id, expense);
};

// Remove an expense by its ID
export const deleteExpenseById = async (id: number): Promise<void> => {
  return await deleteExpense(id);
};
