const SMClient = require('./SMClient');
const TwitchChatbot = require('./../../chatsbots/twitchChatbot')
const GamblingMachine = require('./../../gambling/gamblingMachine')

class SlotMachineGame {

    constructor(name, io) {
        const namespaceRegex = new RegExp(`^[\/]${name}[\/]?`)
        this._SMnamespace = io.of(namespaceRegex);
        this._SMnamespace.on('connection', this._acceptConnection.bind(this));
        this._gamblingMachine = new GamblingMachine();
    }
    
    async _acceptConnection(socket) {
        try {
            this._client = new SMClient(socket);

            this._chatbot = await this._initChatbot({
                botName: process.env.BOT_ACCOUNT,
                authCode: process.env.AUTH,
                streamAccount: process.env.STREAM_ACCOUNT
            });
            this._chatbot.onMessageRecieved(this._handleIncomingMessage.bind(this));
        } catch (err) {
            console.error(err);
        }
    }

    _handleIncomingMessage(message) {
        if (message.message == "!gamble") {//just a temp handler
            //Check player currency
            const gambleResults = this._gamblingMachine.spinGamble(5, 5)

            this._client.playSlotmachine(gambleResults.slotNumbers, message.sender).then(() => {
                if(true) this._chatbot.sendMessage(message.sender + ", you rolled: " + gambleResults.characters + " and gained " + gambleResults.coinsGained) //TODO put this in options
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    async _initChatbot(twitchData) {
        return new Promise((resolve, reject) => {
            const twitchChatBot = new TwitchChatbot(
                twitchData.botName,
                twitchData.authCode,
                twitchData.streamAccount
            )

            twitchChatBot.connect()
                .then(() => resolve(twitchChatBot))
                .catch(() => reject(new Error("failed to connect to twitch")))
        })

    }



}

module.exports = SlotMachineGame