import express from 'express';
import { expensesRouter } from './expenses/expenses.controller';
import { Logger } from './helpers/Logger';
import { config } from './config';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/expenses', expensesRouter);

export const start = () => {
  app.listen(config.port, () => {
    Logger.info(`Server listening on port ${config.port}`);
  });
};
