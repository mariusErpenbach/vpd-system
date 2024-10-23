import mysql from "mysql2";

// Verbindung zur MySQL-Datenbank herstellen
const db = mysql.createConnection({
  host: 'localhost',    // Standardmäßig 'localhost', da du lokal arbeitest
  user: 'hawty',        // Dein MySQL-Benutzername
  password: 'headstrong312',  // Dein MySQL-Passwort
  database: 'sensordaten',   // Name der Datenbank
});

// Verbindung teesten
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default db;
