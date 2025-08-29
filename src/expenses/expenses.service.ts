import { insertExpense, getAllExpenses, Expense } from './expenses.repository';

export const addExpense = (expense: Expense): Expense => {
  return insertExpense(expense);
};

export const listExpenses = (): Expense[] => {
  return getAllExpenses();
};
