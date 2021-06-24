import { Namespace, Server, Socket } from "socket.io";
import ChatBot from "../chatbots/chatbot";
import TwitchChatBot from "../chatbots/twitch/twitchChatbot";
import GamblingMachine from "../gambling/gamblingMachine";
import Message from "../messages/Message";
import Game from "./game";
import SMClient from "./SmClient";

export default class SlotMachineGame implements Game {

    private readonly namespace: Namespace;
    private readonly gamblingMachine: GamblingMachine

    private client: SMClient;
    private chatbot: ChatBot;

    public constructor(name: string, io: Server) {
        const namespaceRegex = new RegExp(`^[/]${name}[/]?`)

        this.namespace = io.of(namespaceRegex);
        this.gamblingMachine = new GamblingMachine();
    }

    public start(): void {
        this.namespace.on('connection', this.acceptConnection.bind(this));
    }

    public stop(): void {
        this.namespace.removeAllListeners();
    }


    private async acceptConnection(socket: Socket): Promise<void> {
        try {
            this.client = new SMClient(socket);

            this.chatbot = await this.initChatbot(
                process.env.BOT_ACCOUNT,
                process.env.AUTH,
                process.env.STREAM_ACCOUNT
            )
            this.chatbot.onMessageRecieved(this.handleIncomingMessage.bind(this), false);
        }
        catch (err) {
            console.error(err);
        }
    }

    private handleIncomingMessage(message: Message): void {
        if (message.message === "!gamble") {//Just a temp handler
            //Check player currency
            const gambleResults = this.gamblingMachine.spinGamble(5, 5)
            

            this.client.playSlotmachine(gambleResults.slotNumbers, message.sender).then(() => {                
                void this.chatbot.sendMessage(`${message.sender}, you rolled: ${gambleResults.characters.toString()} and gained ${gambleResults.coinsGained}`) //TODO put this in options
            }).catch((err) => {
                console.error(err);
            });
        }
    }


    private initChatbot(botName: string, authCode: string, streamAccount: string): Promise<ChatBot> {
        return new Promise((resolve, reject) => {
            const twitchChatBot = new TwitchChatBot(
                botName,
                authCode,
                [streamAccount]
            )

            twitchChatBot.connect()
                .then(() => resolve(twitchChatBot))
                .catch(() => reject(new Error("failed to connect to twitch")))
        })

    }


}