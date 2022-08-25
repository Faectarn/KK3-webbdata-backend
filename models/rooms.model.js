const DB = require("../database");

async function addRoom(roomName) {
  const SQL = "INSERT INTO rooms (room_name) VALUES ($1)";
    const result = await DB.query(SQL, [roomName])
  return result.rows
}

async function getRooms() {
  const SQL = "SELECT * FROM rooms";
    const result = await DB.query(SQL)
  return result.rows
}

async function deleteRoom(roomName) {
  const SQL = "DELETE from rooms where room_name = $1";
    const result = await DB.query(SQL, [roomName])
  return result.rows
}

module.exports = {
  addRoom,
  deleteRoom,
  getRooms
};