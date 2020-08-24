const tmi = require("tmi.js")
const messageTypes = require('./messageTypes')

const MessageTypeConversion = {
    "whisper": messageTypes.DIRECT,
    "actions": messageTypes.COMMAND,
    "chat": messageTypes.PUBLIC
}

class TwitchChatBot {

    constructor(username, password, operatingChannel) {
        if (!Array.isArray(operatingChannel))
            operatingChannel = [operatingChannel]

        this._identity = { username, password }
        this._channel = [operatingChannel[0]]
        this._connectionsOptions = { reconnect: true, secure: true }
        this._options = { debug: process.env.MODE != "PRODUCTION" }
        this.connected = false
        this._createClient()
        this._setEvents();

    }

    async connect() {
        return this.client.connect()
            .then((data) => {
                this.connected = true
                return data
            });
    }

    onMessageRecieved(callback, ignoreOwnMessages = true) {
        this.client.on("message", (channel, userstate, message, self) => {
            if (self && ignoreOwnMessages) return;
            callback(this._createMessageData(channel, userstate, message, self))
        })
    }

    async sendMessage(message) {
        return this.client.say(this._channel[0], message).catch()
    }

    _createClient() {

        this.client = new tmi.Client({
            identity: this._identity,
            channels: this._channel,
            connection: this._connectionsOptions,
            options: this._options
        })
    }

    _setEvents() {
        this.client.on("connected", (address, port) => this.connected = true);
        this.client.on("disconnected", (address, port) => this.connected = false);
    }

    _createMessageData(channel, context, message, self) {

        return {
            platform: "twitch",
            channel: channel.substring(1),

            sender: context["display-name"],
            senderIsMod: context.mod || context.badges.broadcaster == '1',
            messageType: MessageTypeConversion[context["message-type"]],
            message,

            sendByChatbot: self,
        }
    }

}

module.exports = TwitchChatBot;