var http = require('http').createServer();
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  http.listen(3008, () => {
    console.log('listening on *:3008');
  });