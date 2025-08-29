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

export const validate_date = (date: string) => {
  let formattedDate: Date;
  if (date) {
    const appendTime = `${date}T00:00:00Z`;
    // Parse the date string
    const parsed = parseISO(appendTime);
    if (isValid(parsed)) {
      formattedDate = parsed;
    } else {
      // Fallback or throw an error if invalid
      formattedDate = new Date();
    }
  } else {
    formattedDate = new Date();
  }
  return formattedDate;
};
