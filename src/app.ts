import express from 'express';
import { expensesRouter } from './expenses/expenses.controller';
import Logger from './helpers/Logger';
import { config } from './config';
import morgan from 'morgan';
import errorHandler from './helpers/middlewares/errorHandler';
import { Request, Response, NextFunction } from 'express';

export const app = express();

// Middleware
const setupMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined')); // or "tiny" for minimal logs
};

// Routes
const addRoutes = () => {
  app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
  app.use('/api/expenses', expensesRouter);
};

// Error Handlers
const setupErrorHandlers = () => {
  app.use(errorHandler);
  app.use((req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ error: 'Page not found' });
  });
};

export const start = () => {
  setupMiddlewares();
  addRoutes();
  setupErrorHandlers();

  app.listen(config.port, () => {
    Logger.info(`Server listening on port ${config.port}`);
  });
};
