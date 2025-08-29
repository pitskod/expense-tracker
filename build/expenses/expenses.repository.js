"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExpenses = exports.insertExpense = void 0;
const db_service_1 = require("../db/db.service");
const insertExpense = (expense) => {
    const stmt = db_service_1.db.prepare(`
        INSERT INTO expenses (name, amount, currency, category, date)
        VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(expense.name, expense.amount, expense.currency, expense.category, expense.date);
    return { ...expense, id: Number(info.lastInsertRowid) };
};
exports.insertExpense = insertExpense;
const getAllExpenses = () => {
    return db_service_1.db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
};
exports.getAllExpenses = getAllExpenses;
