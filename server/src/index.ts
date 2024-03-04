import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
// const server = http.createServer(app);

console.log('running in', process.env.NODE_ENV, 'mode');

app.use(express.static(path.resolve(__dirname, '../../client/dist/')));

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    console.log('request at /');
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}

// server.listen(PORT, () => {
//   console.log('server is running in', process.env.NODE_ENV)
//   console.log('listening on port', PORT)
// })

const server = app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3030',
  },
});

type usersType = Record<string, string>;
const users: usersType = {};

type gameRoomsType = {
  [key: string]: Set<string>;
};
const gameRooms: gameRoomsType = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', (data) => {});
  // console.log(users);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.on('chat message', (message) => {
  //   console.log('message', message);
  //   socket.broadcast.emit('chat message', message);
  // });

  socket.on('join room', (data) => {
    users[socket.id] = data.displayName;
    console.log('user', data.displayName, 'trying to join room', data.room);
    users[socket.id] = data.displayName;
    socket.join(data.room);
    gameRooms[data.room]
      ? gameRooms[data.room].add(socket.id)
      : (gameRooms[data.room] = new Set([data.displayName]));
    io.to(data.room).emit('message', `${data.displayName} has joined`);
    socket.emit('current players', [...gameRooms[data.room]]);
  });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });
