SQLite API: https://github.com/WiseLibs/better-sqlite3

```javascript
/* GET DATA */
// Prepares
db.prepare('SELECT name, email FROM Clients');
// Prepares & Runs
db.prepare('SELECT name, email FROM Clients').all();

// Prepares (with ?)
let query = db.prepare('SELECT * FROM users WHERE email = ?');
// Runs with the ? filled in
query.get('example@example.com')

/* INSERT DATA */
// Prepares (with ?)
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
insert.run('John Doe', 'john@example.com');

```

