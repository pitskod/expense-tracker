"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listExpenses = exports.addExpense = void 0;
const expenses_repository_1 = require("./expenses.repository");
const addExpense = (expense) => {
    return (0, expenses_repository_1.insertExpense)(expense);
};
exports.addExpense = addExpense;
const listExpenses = () => {
    return (0, expenses_repository_1.getAllExpenses)();
};
exports.listExpenses = listExpenses;
