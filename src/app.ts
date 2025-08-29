import express from 'express';
import { expensesRouter } from './expenses/expenses.controller';
import { Logger } from './helpers/Logger';
import { config } from './config';
import morgan from 'morgan';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Use 'combined' for detailed logging or 'tiny' for minimal logs

// Routes
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/api/expenses', expensesRouter);

export const start = () => {
  app.listen(config.port, () => {
    Logger.info(`Server listening on port ${config.port}`);
  });
};
