const http = require('http').createServer();
require('dotenv').config()
const io = require('socket.io')(http);
const SlotMachineGame = require("./games/slotmachine/slotMachineGame")

const slotMachineGame = new SlotMachineGame('slots', io);
http.listen(3008, () => {
  console.log('listening on *:3008');
});
