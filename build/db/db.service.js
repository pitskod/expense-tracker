"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
let db;
try {
    // Use environment variable or fallback to 'expenses.db'
    const dbPath = process.env.DB_PATH || path_1.default.join(__dirname, '../../expenses.db');
    exports.db = db = new better_sqlite3_1.default(dbPath);
    // Create expenses table if it doesn't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            currency TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL
        );
    `);
    console.log('Database initialized');
}
catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    process.exit(1);
}
