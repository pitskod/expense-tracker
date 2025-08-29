import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database;

try {
  // Use environment variable or fallback to 'expenses.db'
  const dbPath =
    process.env.DB_PATH || path.join(__dirname, '../../expenses.db');
  db = new Database(dbPath);

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
} catch (error) {
  console.error('Failed to initialize SQLite database:', error);
  process.exit(1);
}

export { db };
