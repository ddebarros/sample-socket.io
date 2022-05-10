const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

const io = new Server(server);

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', (socket) => {
  const id = setInterval(function () {
    const message = JSON.stringify(process.memoryUsage());
    socket.emit('process-event', message)
  }, 100);

  console.log('started client interval');

  socket.on('disconnect', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});