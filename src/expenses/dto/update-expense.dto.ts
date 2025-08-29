import * as Yup from 'yup';

// Define a schema
export const updateExpenseSchema = Yup.object({
  name: Yup.string(),
  amount: Yup.number().positive().integer(),
  currency: Yup.string().oneOf(
    ['PLN', 'USD', 'EUR'],
    'Currency must be one of PLN, USD or EUR',
  ),
  category: Yup.string(),
  date: Yup.string(),
});
