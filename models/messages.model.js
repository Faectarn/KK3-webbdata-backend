const DB = require("../database");

// function addMessage({ message, username, user_id, room_name, time, }) {
//   const SQL =
//     "INSERT INTO messages (message, username, user_id, room_name, time) VALUES (?, ?, ?, ?, ?)";
//   return new Promise((resolve, reject) => {
//     DB.run(
//       SQL,
//       [message, username, user_id, room_name, time],
//       (error) => {
//         if (error) {
//           console.error(error.message);
//           reject(error);
//         }
//         resolve();
//       }
//     );
//   });
// }

async function addMessage(message, username, user_id, room_name, time) {
  const SQL =
    "INSERT INTO messages (message, username, user_id, room_name, time) VALUES ($1, $2, $3, $4, $5)";
  const result = await DB.query(SQL, [message, username, user_id, room_name, time]);

  return result.rows;
}

// function getRoomMessages(roomName) {
//   const SQL = "SELECT * FROM messages WHERE room_name = ?";
//   return new Promise((resolve, reject) => {
//     DB.all(SQL, [roomName], (error, rows) => {
//       if (error) {
//         console.error(error.message);
//         reject(error);
//       }
//       resolve(rows);
//     });
//   });
// }

async function getRoomMessages(roomName) {
  const SQL = "SELECT * FROM messages WHERE room_name = $1";
  const result = await DB.query(SQL, [roomName]);

  return result.rows;
}

// function deleteRoomMessages(roomName) {
//   const SQL = "DELETE from messages where room_name = ?";
//   return new Promise((resolve, reject) => {
//     DB.run(SQL, [roomName], (error, rows) => {
//       if (error) {
//         console.error(error.message);
//         reject(error);
//       }
//       resolve(rows);
//     });
//   });
// }

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