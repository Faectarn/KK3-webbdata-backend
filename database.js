const { Client } = require("pg");

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString:
    "postgres://ruscejxpmocdav:d141272709fb5c4a106bf8c85a35ff0b56848630295dc25b7136e09b637f2c39@ec2-54-228-125-183.eu-west-1.compute.amazonaws.com:5432/detokkqskbjl4t",
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
     time INT)`;

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