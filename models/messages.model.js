const DB = require("../database");

async function addMessage(message, username, user_id, room_name, time) {
  const SQL =
    "INSERT INTO messages (message, username, user_id, room_name, time) VALUES ($1, $2, $3, $4, $5)";
  const result = await DB.query(SQL, [message, username, user_id, room_name, time]);

  return result.rows;
}

async function getRoomMessages(roomName) {
  const SQL = "SELECT * FROM messages WHERE room_name = $1";
  const result = await DB.query(SQL, [roomName]);

  return result.rows;
}

async function deleteRoomMessages(roomName) {
  const SQL = "DELETE from messages where room_name = $1";
  const result = await DB.query(SQL, [roomName]);

  return result.rows;
}

module.exports = {
  addMessage,
  deleteRoomMessages,
  getRoomMessages,
};