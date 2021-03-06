const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

console.log("Connected to database");

const room = `CREATE TABLE IF NOT EXISTS rooms
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_name TEXT UNIQUE)`;

const message = `CREATE TABLE IF NOT EXISTS messages
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
     message TEXT NOT NULL,
     username TEXT,
     room_name TEXT,
     user_id TEXT,
     time INT)`;

db.run(room, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

db.run(message, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

module.exports = db;