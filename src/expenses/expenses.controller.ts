import { Router, Request, Response } from 'express';
import {
  createExpense,
  getExpense,
  listExpenses,
  deleteExpenseById,
  updateExpenseById,
} from './expenses.service';
import { Expense } from './entity/expense.entity';
import Logger from '../helpers/Logger';
import { validate_date, validator } from '../helpers/middlewares/validator';
import { createExpenseSchema } from './dto/create-expense.dto';

export const expensesRouter: Router = Router();

expensesRouter.post(
  '/',
  validator(createExpenseSchema),
  async (req: Request, res: Response) => {
    Logger.info(`Create Expense`);

    try {
      const { name, amount, currency, category, date } = req.body;

      if (!name || !amount || !currency || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let expense: Expense;

      try {
        expense = {
          name,
          amount: Number(amount),
          currency,
          category,
          date: validate_date(date),
        };
      } catch (error) {
        return res.status(400).json({ error: error });
      }
      const saved = await createExpense(expense);
      return res.status(201).json(saved);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Failed to add expense', details: error });
    }
  },
);

expensesRouter.get('/', async (req: Request, res: Response) => {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  const offset = req.query.offset
    ? parseInt(req.query.offset as string, 10)
    : undefined;
  const fromDate = req.query.fromDate
    ? new Date(req.query.fromDate as string)
    : undefined;
  const toDate = req.query.toDate
    ? new Date(req.query.toDate as string)
    : undefined;

  try {
    const expenses = await listExpenses(limit, offset, fromDate, toDate);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses', details: error });
  }
});

expensesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const expense = await getExpense(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    return res.status(200).json(expense);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

expensesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }
    await deleteExpenseById(id);
    return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch {
    return res.status(500).json({ error: 'Failed to delete expense' });
  }
});

expensesRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const updatedExpense = await updateExpenseById(id, updatedData);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(200).json(updatedExpense);
  } catch {
    return res.status(500).json({ error: 'Failed to update expense' });
  }
});
