// expenses.router.spec.ts
import request from 'supertest';
import express, { Express } from 'express';
import { expensesRouter } from '../src/expenses/expenses.controller';

// Mock dependencies
jest.mock('../src/expenses/expenses.service', () => ({
  createExpense: jest.fn(),
  getExpense: jest.fn(),
  listExpenses: jest.fn(),
  deleteExpenseById: jest.fn(),
  updateExpenseById: jest.fn(),
}));

jest.mock('../src/helpers/Logger', () => ({
  info: jest.fn(),
}));

// jest.mock('../src/helpers/middlewares/validator', () => ({
//   validator: () => (req, res, next) => next(),
//   validate_date: (date: string) => {
//     if (!date) return new Date();
//     if (isNaN(Date.parse(date))) throw new Error('Invalid date');
//     return new Date(date);
//   },
// }));

import { createExpense } from '../src/expenses/expenses.service';

describe('POST /expenses', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/expenses', expensesRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/expenses').send({
      name: 'Coffee',
      // amount missing
      currency: 'USD',
      category: 'Food',
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Validation error',
      errors: ['Amount is mandatory'],
    });
  });

  it('should return 201 if date is invalid', async () => {
    (createExpense as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Coffee',
      amount: 10,
      currency: 'PLN',
      category: 'Food',
      date: new Date('2025-01-01'),
    });

    const res = await request(app).post('/expenses').send({
      name: 'Coffee',
      amount: 10,
      currency: 'PLN',
      category: 'Food',
      date: 'invalid-date',
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Coffee',
      amount: 10,
      currency: 'PLN',
      category: 'Food',
    });
    expect(createExpense).toHaveBeenCalled();
  });

  it('should create expense successfully', async () => {
    (createExpense as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Coffee',
      amount: 10,
      currency: 'EUR',
      category: 'Food',
      date: new Date('2023-01-01'),
    });

    const res = await request(app).post('/expenses').send({
      name: 'Coffee',
      amount: 10,
      currency: 'EUR',
      category: 'Food',
      date: '2023-01-01',
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Coffee',
      amount: 10,
      currency: 'EUR',
      category: 'Food',
    });
    expect(createExpense).toHaveBeenCalled();
  });

  it('should return 500 if service throws error', async () => {
    (createExpense as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).post('/expenses').send({
      name: 'Biedronka',
      amount: '1',
      currency: 'PLN',
      category: 'shop',
      date: '2025-01-01',
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to add expense');
  });
});
