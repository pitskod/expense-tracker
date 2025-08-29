export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  // add more currencies as needed
}

export type Expense = {
  id?: number;
  name: string;
  amount: number;
  currency: Currency;
  category: string;
  date?: Date;
};
