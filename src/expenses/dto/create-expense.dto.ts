import * as Yup from 'yup';

// Define a schema
export const createExpenseSchema = Yup.object({
  name: Yup.string().required('Name is mandatory'),
  amount: Yup.number().positive().integer().required('Amount is mandatory'),
  currency: Yup.string()
    .required('Currency is mandatory')
    .oneOf(['PLN', 'USD', 'EUR'], 'Currency must be one of PLN, USD or EUR'),
  category: Yup.string().required('Category is mandatory'),
  date: Yup.string(),
});
