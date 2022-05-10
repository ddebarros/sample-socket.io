const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  transports: ['websocket']
});

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

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});