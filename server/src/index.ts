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
// track user id and display names
const users: usersType = {};

type gameRoomsType = {
  [key: string]: Map<string, string>;
};
// track users of every room
const gameRooms: gameRoomsType = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // disconnect from connected rooms when disconnecting
  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        gameRooms[room].delete(socket.id);
        socket.to(room).emit('user has left', socket.id);
      }
    }
  });

  // joining room is done at the same time as joining the server
  // save user in data structure as id: displayname
  socket.on('join room', (data) => {
    users[socket.id] = data.displayName;
    console.log('user', users[socket.id], 'trying to join room', data.room);

    // join room, add user to rooms data structure
    socket.join(data.room);
    if (gameRooms[data.room]) {
      gameRooms[data.room].set(socket.id, data.displayName);
    } else gameRooms[data.room] = new Map([[socket.id, data.displayName]]);

    // inform other connected clients of new user
    io.to(data.room).emit('user has joined', [socket.id, data.displayName]);

    // inform new client of all players in room
    socket.emit('current players', Object.fromEntries(gameRooms[data.room]));
  });

  socket.on('chat message', (message) => {
    console.log('message', message);
    io.emit('chat message', { sender: socket.id, message: message });
  });
});
