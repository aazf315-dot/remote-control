const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('جهاز جديد اتصل:', socket.id);

  // استقبال بث الفيديو من الهاتف وإرساله للمتصفح
  socket.on('screen-data', (data) => {
    socket.broadcast.emit('screen-data', data);
  });

  // استقبال أوامر اللمس من المتصفح وإرسالها للهاتف
  socket.on('touch-event', (data) => {
    socket.broadcast.emit('touch-event', data);
  });

  socket.on('disconnect', () => {
    console.log('انقطع اتصال الجهاز:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`السيرفر يعمل الآن على المنفذ: http://localhost:${PORT}`);
});

