import { Request, Response, NextFunction } from 'express';
import { AnySchema, ValidationError } from 'yup';
import { isValid, parseISO } from 'date-fns';

/**
 * A reusable validator middleware for any Yup schema.
 *
 * @param schema - A Yup schema to validate the request data against.
 * @returns An Express middleware function.
 */
export const validator = (schema: AnySchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Validate the request body against the provided schema
      await schema.validate(req.body, { abortEarly: false }); // `abortEarly: false` collects all errors
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error instanceof ValidationError) {
        // Return a 400 response with detailed validation errors
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors, // Array of validation error messages
        });
      } else {
        next(error); // Pass unexpected errors to the global error handler
      }
    }
  };
};

export const prepare_date = (date: string) => {
  return `${date}T00:00:00Z`;
};

export const validate_date = (date: string) => {
  if (date && isValid(parseISO(date))) {
    return true;
  }
};

export const get_date = (date: string) => {
  const prepared_date = prepare_date(date);
  if (isValid(prepared_date)) {
    return new Date(prepared_date);
  } else {
    return new Date();
  }
};
