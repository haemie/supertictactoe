import { Server, Socket } from 'socket.io';
import { joinDataType, usersType, gameRoomsType } from '../types';

export default function socketRoomHandler(
  socket: Socket,
  users: usersType,
  gameRooms: gameRoomsType,
  io: Server
) {
  // disconnect from connected rooms when disconnecting
  socket.on('disconnecting', (reason: string) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        gameRooms[room].delete(socket.id);
        socket.to(room).emit('user has left', socket.id);
      }
    }
  });

  // joining room is done at the same time as joining the server
  // save user in data structure as id: displayname
  socket.on('join room', (data: joinDataType) => {
    users[socket.id] = data.displayName;
    console.log('user', users[socket.id], 'trying to join room', data.room);

    // join room, add user to rooms data structure
    socket.join(data.room);
    if (gameRooms[data.room]) {
      gameRooms[data.room].set(socket.id, data.displayName);
    } else gameRooms[data.room] = new Map([[socket.id, data.displayName]]);

    // inform other connected clients of new user
    socket.to(data.room).emit('user has joined', [socket.id, data.displayName]);

    // inform new client of all players in room
    socket.emit('current players', Object.fromEntries(gameRooms[data.room]));
  });
}
