import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import socketRoomHandler from './roomHandler';
import { usersType, gameRoomsType } from '../types';

// track user id and display names
const users: usersType = {};

// track users of every room
const gameRooms: gameRoomsType = {};

export default function initializeSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3030',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socketRoomHandler(socket, users, gameRooms, io);

    socket.on('chat message', (message) => {
      console.log('message', message);
      io.emit('chat message', { sender: socket.id, message: message });
    });
  });
}
