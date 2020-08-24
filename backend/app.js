const tmi = require('tmi.js');
var http = require('http').createServer();
var io = require('socket.io')(http);

const opts = {
  identity: {
    username: process.env.BOT_ACCOUNT,
    password: process.env.AUTH
  },
  channels: [
    process.env.STREAM_ACCOUNT
  ]
};
const client = new tmi.client(opts);

io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  http.listen(3008, () => {
    console.log('listening on *:3008');
  });