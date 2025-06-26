import io from 'socket.io-client';
const sockets = io(process.env.REACT_APP_BACKEND_URL, { 
    autoConnect: true,
    transports: ['polling', 'websocket']
});
// sockets.connected()
sockets.on('connect', () => {
  console.log('Connected:', sockets.connected);
  console.log('Socket ID:', sockets.id);
});

sockets.on('disconnect', () => {
  console.log('Disconnected');
});

sockets.on('connect_error', (error) => {
  console.log('Connection Error:', error);
});
export default sockets;
