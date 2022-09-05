const { Client } = require("pg");

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString:
    "postgres://osucakgiksbeuf:9c0ce613e4eea6f5479c0ba076e6e3f213ba2a0ebbb1d15821c5f4c462fc764b@ec2-52-31-70-136.eu-west-1.compute.amazonaws.com:5432/dddsi8pgr4hfsg",
});

db.connect()

console.log("Connected to database");

const room = `CREATE TABLE IF NOT EXISTS rooms
    (id SERIAL PRIMARY KEY,
    room_name TEXT UNIQUE)`;

const message = `CREATE TABLE IF NOT EXISTS messages
    (id SERIAL PRIMARY KEY,
     message TEXT NOT NULL,
     username TEXT,
     room_name TEXT,
     user_id TEXT,
     time BIGINT)`;

db.query(room, (error) => {
	if (error) {
			console.error(error.message);
			throw error;
	}
}); 

db.query(message, (error) => {
	if (error) {
			console.error(error.message);
			throw error;
	}
}); 

module.exports = db;
