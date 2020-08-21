require('dotenv').config();
const tmi = require('tmi.js');

const opts = {
  identity: {
    username: "BasicMilky",
    password: process.env.AUTH
  },
  channels: [
    "BasicMilky"
  ]
};
const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } 
  const commandName = msg.trim();

  console.log(context.username + " " + commandName);

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

function spinGamble(target, context){
    var reelCharacters = [3];
    for (let i = 0; i < 3; i++) {
        reelCharacters[i] = getReel();
    }
    client.say(target, ` ${context["display-name"]}, Your results are:  ${reelCharacters[0]} - ${reelCharacters[1]} - ${reelCharacters[2]}`);
        
}

function getReel(){
    var characters = ["Empty", "Cherry", "Bar", "Superbar", "G7", "R7"];
    var reels = { physicalReel: [0, 1, 0, 5, 0, 2, 0, 4, 0, 3 ],
        digitalReel: [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 3, 3, 3 ] }; 

        var randomNumber = Math.floor(Math.random() * reels.digitalReel.length);
        console.log(characters[reels.digitalReel[randomNumber]]);
    return characters[reels.digitalReel[randomNumber]];
}





function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}