"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensesRouter = void 0;
const express_1 = require("express");
const expenses_service_1 = require("./expenses.service");
exports.expensesRouter = (0, express_1.Router)();
exports.expensesRouter.post('/', (req, res) => {
    try {
        const { name, amount, currency, category, date } = req.body;
        if (!name || !amount || !currency || !category || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const expense = { name, amount: Number(amount), currency, category, date };
        const saved = (0, expenses_service_1.addExpense)(expense);
        return res.status(201).json(saved);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to add expense' });
    }
});
exports.expensesRouter.get('/', (req, res) => {
    try {
        const expenses = (0, expenses_service_1.listExpenses)();
        return res.json(expenses);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});
