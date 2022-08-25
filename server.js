const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const winston = require('winston');

const chatBox = require('./utils/messages');
const { addMessage, getRoomMessages, deleteRoomMessages } = require('./models/messages.model');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const { getRooms, addRoom, deleteRoom, } = require('./models/rooms.model');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: ["*", "https://faectarn-chat-frontend.herokuapp.com"], 
    methods: ["GET", "POST", "DELETE"]
  }
});

const port = process.env.PORT || 80;

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: './chatlog.log' })
  ]
});

app.use(bodyParser.json({
  type: "*/*"
}));

app.get('/rooms', async (req, res) => {
  const rooms = await getRooms();
  res.send(JSON.stringify(rooms));
})

app.post('/rooms/:name', async (req, res) => {
  const { name } = req.params;
  const rooms = await addRoom(name);
  res.send(JSON.stringify(rooms));
  console.log(`Room: ${name} has been created`);
})

app.delete('/rooms/:name', async (req, res) => {
  const { name } = req.params;
  const rooms = await deleteRoom(name);
  res.send(JSON.stringify(rooms));
  deleteRoomMessages(name);
  console.log(`Room: ${name} has been deleted`);
})

const chatBot = 'Chat bot';

io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    socket.emit('message', chatBox(chatBot, `Välkommen till chatten ${user.username}!`, Date.now()));

    getRoomMessages(room)
      .then((data) => {
        data.forEach((message) => {
          socket.emit('message', chatBox(message.username, message.message, message.time));
        })
      })

    socket.broadcast
      .to(user.room)
      .emit('message', chatBox(chatBot, `${user.username} har gått med i chatten`, Date.now())
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chatMessage', msg => {
    if (msg !== "") {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit('message', chatBox(user.username, msg));
      addMessage({ message: msg, room_name: user.room, username: user.username, user_id: user.id, time: Date.now() })
      logger.info({ user: user.username, message: msg, room: user.room })
    }
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit('message', chatBox(chatBot, `${user.username} har lämnat chatten`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

console.log(`starting server on port ${port}`)
server.listen(port, () => console.log(`Server running on port ${port}`));
