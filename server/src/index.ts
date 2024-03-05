import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
dotenv.config();
import initializeSocket from './sockets/sockets';

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

initializeSocket(server);
