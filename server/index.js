const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 7006;
const path = require('path');
require('dotenv')

let socketList = {};

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Route
app.get('/', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});


// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected!');
    socket.broadcast
      // .to(roomId)
      .emit('frontendUserLeave', { connectSocketId: socket.id, userName: [socket.id] });
  });

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 }
    const numberOfClients = roomClients.length
    console.log(`Room ID: ${roomId}`)
    console.log(`roomClients: ${roomClients}`)
    console.log(`numberOfClients of ${roomId}: ${numberOfClients}`)

    if (!numberOfClients) {
      console.log(`Creating room ${roomId} and emitting room_created socket event`)
      socket.join(roomId)
      socket.emit('room_created', {
        roomId: roomId,
        peerId: socket.id,
        userName
      })
    } else {
      console.log(`Joining room ${roomId} and emitting room_joined socket event`)
      socket.join(roomId)
      socket.emit('room_joined', {
        roomId: roomId,
        peerId: socket.id,
        userName
      })
    } 

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   */
  socket.on('backendJoinRoom', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ connectSocketId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('frontendUserJoin', users);
        // io.sockets.in(roomId).emit('frontendUserJoin', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('backendCallUser', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('frontendReceiveCall', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('backendAcceptCall', ({ signal, to }) => {
    io.to(to).emit('frontendCallAccepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('backendLeaveRoom', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('frontendUserLeave', { connectSocketId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on('backendToggleCameraAudio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('frontendToggleCamera', { connectSocketId: socket.id, switchTarget });
  });
});

http.listen(PORT, () => {
  console.log(`Connected : ${PORT}`);
});
