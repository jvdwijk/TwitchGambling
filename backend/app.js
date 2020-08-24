const http = require('http').createServer();
const io = require('socket.io')(http);
require('dotenv').config()

const TwitchChatBot = require('./src/chatsbots/twitchChatbot');

const chatBot = new TwitchChatBot(
  process.env.BOT_ACCOUNT,
  process.env.AUTH,
  process.env.STREAM_ACCOUNT
)

chatBot.connect()


chatBot.onMessageRecieved((data) => {
  console.log(data);
})


io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3008, () => {
  console.log('listening on *:3008');
});