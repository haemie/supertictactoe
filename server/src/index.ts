import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
dotenv.config();

const PORT = process.env.PORT || 3000
const app = express()
// const server = http.createServer(app);

console.log("running in", process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    console.log('request at /')
    res.sendFile(__dirname + '/index.html');
  });
}




// server.listen(PORT, () => {
//   console.log('server is running in', process.env.NODE_ENV)
//   console.log('listening on port', PORT)
// })

const server = app.listen(PORT, () => {
  console.log('listening on port', PORT)
})

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (message) => {
    console.log("message", message)
    socket.broadcast.emit('chat message', message)

  })

})

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });
