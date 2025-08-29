// expenses.router.get.spec.ts
import request from 'supertest';
import express, { Express } from 'express';
import { expensesRouter } from '../src/expenses/expenses.controller';

// Mock the service
jest.mock('../src/expenses/expenses.service', () => ({
  createExpense: jest.fn(),
  getExpense: jest.fn(),
  listExpenses: jest.fn(),
  deleteExpenseById: jest.fn(),
  updateExpenseById: jest.fn(),
}));

import { listExpenses } from '../src/expenses/expenses.service';

describe('GET /expenses', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/expenses', expensesRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return expenses successfully without query params', async () => {
    const mockExpenses = [
      { id: 1, name: 'Coffee', amount: 10, currency: 'USD' },
      { id: 2, name: 'Book', amount: 20, currency: 'USD' },
    ];

    (listExpenses as jest.Mock).mockResolvedValue(mockExpenses);

    const res = await request(app).get('/expenses');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockExpenses);
    expect(listExpenses).toHaveBeenCalledWith(
      undefined,
      undefined,
      undefined,
      undefined,
    );
  });

  it('should pass query params correctly', async () => {
    const mockExpenses = [
      {
        id: 3,
        name: 'Laptop',
        amount: 1000,
        currency: 'USD',
        category: 'Food',
        date: '2025-01-01',
      },
    ];
    (listExpenses as jest.Mock).mockResolvedValue(mockExpenses);

    const res = await request(app).get('/expenses').query({
      limit: '5',
      offset: '10',
      fromDate: '2023-01-01',
      toDate: '2023-02-01',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockExpenses);
    expect(listExpenses).toHaveBeenCalledWith(
      5,
      10,
      new Date('2023-01-01'),
      new Date('2023-02-01'),
    );
  });

  it('should return 500 if service throws error', async () => {
    (listExpenses as jest.Mock).mockRejectedValue(new Error('DB failure'));

    const res = await request(app).get('/expenses');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch expenses');
  });
});
