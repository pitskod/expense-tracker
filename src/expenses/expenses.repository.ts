import { db } from '../db/db.service';

export interface Expense {
  id?: number;
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
}

export const insertExpense = (expense: Expense): Expense => {
  const stmt = db.prepare(`
        INSERT INTO expenses (name, amount, currency, category, date)
        VALUES (?, ?, ?, ?, ?)
    `);
  const info = stmt.run(
    expense.name,
    expense.amount,
    expense.currency,
    expense.category,
    expense.date,
  );
  return { ...expense, id: Number(info.lastInsertRowid) };
};

export const getAllExpenses = (): Expense[] => {
  return db
    .prepare('SELECT * FROM expenses ORDER BY date DESC')
    .all() as Expense[];
};
