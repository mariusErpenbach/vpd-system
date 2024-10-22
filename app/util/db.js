import mysql from "mysql2"

// Verbindung zur MySQL-Datenbank herstellen
export const db = mysql.createConnection({
  host: 'localhost',    // falls deine DB auf dem Raspberry Pi läuft, dann die IP-Adresse des Pi
  user: 'hawty',
  password: 'headstrong312',
  database: 'sensordaten',   // Name der Datenbank, die du erstellt hast
});

// Verbindung testen
db.connect(err=>{
  if(err){console.log("Error connecting to mysql database",err);}
else{ console.log("Connected to mysql database");
}
});


export default db
    