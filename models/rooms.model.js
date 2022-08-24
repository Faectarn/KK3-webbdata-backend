const DB = require("../database");

// function addRoom(roomName) {
//   const SQL = "INSERT INTO rooms (room_name) VALUES (?)";
//   return new Promise((resolve, reject) => {
//     DB.run(SQL, [roomName], (error) => {
//       if (error) {
//         console.error(error.message);
//         reject(error);
//       }
//       resolve();
//     });
//   });
// }

async function addRoom(roomName) {
  const SQL = "INSERT INTO rooms (room_name) VALUES ($1)";
    const result = await DB.query(SQL, [roomName])
  return result.rows
}

// function getRooms() {
//   const SQL = "SELECT * FROM rooms";
//   return new Promise((resolve, reject) => {
//     DB.all(SQL, (error, rows) => {
//       if (error) {
//         console.error(error.message);
//         reject(error);
//       }
//       resolve(rows);
//     });
//   });
// }

async function getRooms() {
  const SQL = "SELECT * FROM rooms";
    const result = await DB.query(SQL)
  return result.rows
}

// function deleteRoom(roomName) {
//   const SQL = "DELETE from rooms where room_name = ?";
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

async function deleteRoom(roomName) {
  const SQL = "DELETE from rooms where room_name = ?";
    const result = await DB.query(SQL, [roomName])
  return result.rows
}

module.exports = {
  addRoom,
  deleteRoom,
  getRooms
};