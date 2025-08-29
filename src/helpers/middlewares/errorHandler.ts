import { Request, Response, NextFunction } from 'express';
import { Logger } from '../Logger';
import { Exception } from '../Exception';

export const errorHandler = (
  error: Error | Exception,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  Logger.error(error.message);

  if (error instanceof Exception) {
    res.status(error.status).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  } else {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500,
      },
    });
  }

  next(error);
};
