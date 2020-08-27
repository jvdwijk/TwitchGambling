const SMClient = require('./SMClient');
const TwitchChatbot = require('./../../chatsbots/twitchChatbot')

class SlotMachineGame {

    constructor(name, io) {
        const namespaceRegex = new RegExp(`^[\/]${name}[\/]?`)
        this._SMnamespace = io.of(namespaceRegex);
        this._SMnamespace.on('connection', this._acceptConnection.bind(this));

    }

    async _acceptConnection(socket) {
        try {
            this._client = new SMClient(socket);
            console.log(process.env.BOT_ACCOUNT)

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
            this._client.playSlotmachine([2, 5, 1], "username").then(() => {
                console.log("succes");
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