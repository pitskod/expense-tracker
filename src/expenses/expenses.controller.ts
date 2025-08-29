import { Router, Request, Response } from 'express';
import { addExpense, listExpenses } from './expenses.service';
import { Expense } from './expenses.repository';

export const expensesRouter = Router();

expensesRouter.post('/', (req: Request, res: Response) => {
  try {
    const { name, amount, currency, category, date } = req.body;

    if (!name || !amount || !currency || !category || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expense: Expense = {
      name,
      amount: Number(amount),
      currency,
      category,
      date,
    };
    const saved = addExpense(expense);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add expense' });
  }
});

expensesRouter.get('/', (req: Request, res: Response) => {
  try {
    const expenses = listExpenses();
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});
