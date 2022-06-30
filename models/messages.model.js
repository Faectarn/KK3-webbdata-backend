const DB = require("../database");

function addMessage({ message, username, user_id, room_name, time, }) {
  const SQL =
    "INSERT INTO messages (message, username, user_id, room_name, time) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    DB.run(
      SQL,
      [message, username, user_id, room_name, time],
      (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve();
      }
    );
  });
}

function getRoomMessages(roomName) {
  const SQL = "SELECT * FROM messages WHERE room_name = ?";
  return new Promise((resolve, reject) => {
    DB.all(SQL, [roomName], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function deleteRoomMessages(roomName) {
  const SQL = "DELETE from messages where room_name = ?";
  return new Promise((resolve, reject) => {
    DB.run(SQL, [roomName], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  addMessage,
  deleteRoomMessages,
  getRoomMessages,
};