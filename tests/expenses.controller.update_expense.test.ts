// expenses.router.patch.spec.ts
import request from 'supertest';
import express, { Express } from 'express';
import { expensesRouter } from '../src/expenses/expenses.controller';

// Mock dependencies
jest.mock('../src/expenses/expenses.service', () => ({
  updateExpenseById: jest.fn(),
}));

import { updateExpenseById } from '../src/expenses/expenses.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validate_date } from '../src/helpers/middlewares/validator';

describe('PATCH /expenses/:id', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/expenses', expensesRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 for invalid ID', async () => {
    const res = await request(app)
      .patch('/expenses/abc')
      .send({ name: 'Coffee' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid expense ID' });
  });

  it('should return 400 if update data is empty', async () => {
    const res = await request(app).patch('/expenses/1').send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'No update data provided' });
  });

  it('should return 400 if date is invalid', async () => {
    (validate_date as jest.Mock) = jest.fn(() => false);

    const res = await request(app)
      .patch('/expenses/1')
      .send({ date: 'invalid-date' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid date format' });
  });

  it('should return 404 if expense not found', async () => {
    (updateExpenseById as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .patch('/expenses/123')
      .send({ name: 'Updated' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Expense not found' });
    expect(updateExpenseById).toHaveBeenCalledWith(123, { name: 'Updated' });
  });

  it('should update expense successfully', async () => {
    const updatedExpense = { id: 1, name: 'Coffee', amount: 10 };
    (updateExpenseById as jest.Mock).mockResolvedValue(updatedExpense);

    const res = await request(app)
      .patch('/expenses/1')
      .send({ name: 'Coffee', amount: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedExpense);
    expect(updateExpenseById).toHaveBeenCalledWith(1, {
      name: 'Coffee',
      amount: 10,
    });
  });

  it('should convert valid date', async () => {
    (validate_date as jest.Mock) = jest.fn(() => true);
    const res = await request(app)
      .patch('/expenses/1')
      .send({ date: '2025-08-29' });

    expect(res.status).toBe(200);
    const updatedCallArg = (updateExpenseById as jest.Mock).mock.calls[0][1];
    expect(updatedCallArg.date).toBeInstanceOf(Date);
  });

  it('should return 500 if service throws error', async () => {
    (updateExpenseById as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .patch('/expenses/1')
      .send({ name: 'Coffee' });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to update expense');
  });
});
