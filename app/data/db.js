import Database from 'better-sqlite3';

// Create or connect to the SQLite database file
const db = new Database('mydatabase.db'); // Use your desired database name

// // Function to initialize the database
// function initializeDatabase() {
//   // Example table creation query
//   db.prepare(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE
//     )
//   `).run();
  
//   // Optionally, seed initial data (adjust as needed)
//   const seed = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
//   seed.run('John Doe', 'john@example.com');
//   seed.run('Jane Smith', 'jane@example.com');
// }

// // Initialize the database
// initializeDatabase();

// Export the database connection for use in other modules
export default db;