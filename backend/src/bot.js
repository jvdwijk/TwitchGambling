const tmi = require('tmi.js');
require('dotenv').config();

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

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } 
  const commandName = msg.trim();

  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } 
  else if (commandName === '!gamble') {

    spinGamble(target, context);
    console.log(`* Executed ${commandName} command`);
  }
}







function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}