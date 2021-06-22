import { ChatUserstate, Client, Options } from 'tmi.js';
import ChatBot from './chatbot';
import Message from '../messages/Message';
import MessageType from '../messages/messageType';

const TWITCH_MESSAGE_TYPE_CONVERSION: Record<string, MessageType>  = {
    "whisper": MessageType.DIRECT,
    "actions": MessageType.COMMAND,
    "chat": MessageType.PUBLIC,
}

const TMI_CONNECTED_EVENT = "connected";
const TMI_DISCONNECTED_EVENT = "disconnected";

const TMI_MESSAGE_EVENT = "message";

export default class TwitchChatBot implements ChatBot{

    public static readonly PLATFORM = "Twitch";

    private readonly username: string;
    private readonly password: string;

    private readonly channel: string;

    private connected: boolean;

    private client: Client;

    
    public constructor(username: string, password: string, operatingChannels: string[]){
        this.username = username;
        this.password = password;

        this.channel = operatingChannels[0];

        this.connected = false;
        
        this.createClient();
        this.setEvents();
    }


    private setEvents(): void {
        this.client.on(TMI_CONNECTED_EVENT, this.setConnected.bind(this, true));
        this.client.on(TMI_DISCONNECTED_EVENT, this.setConnected.bind(this, false));
    }

    private setConnected(current: boolean): void{
        this.connected = current;
    }

    private createClient(): void {
        const options = this.getOptions();
        this.client = new Client(options);
        
    }

    private getOptions(): Options {
        
        return {
            identity: {
                username: this.username,
                password: this.password,
            },
            options: { debug: process.env.MODE !== "PRODUCTION" },
            connection: {
                reconnect: true,
                secure: true,
            },
            channels: [
                this.channel,
            ],
        };
    }

    public connect(): Promise<unknown> {
        return this.client
        .connect()
        .then(() => {
            this.connected = true;
        })
        
    }
    public sendMessage(message: string): Promise<unknown>{
        return this.client.say(this.channel, message)
    }

    public get isConnected(): boolean {
        return this.connected;
    }

    public onMessageRecieved(callback: (message: Message) => void, ignoreOwnMessages: boolean = true): void {
        this.client.on(TMI_MESSAGE_EVENT, (channel: string, context: ChatUserstate, text: string, self: boolean) => {
            if (self && ignoreOwnMessages) {
                return;
            }
            callback(this.createMessageData(channel, context, text, self))
        })
    }


    private createMessageData(channel: string, context: ChatUserstate, text: string, self: boolean): Message {
        const message: Message = new Message();
        message.platform = TwitchChatBot.PLATFORM;
        message.channel = this.channel;

        message.sender = context["display-name"];
        message.senderIsMod = context.mod || (context.badges !== null && context.badges.broadcaster === '1')
        message.messageType = TWITCH_MESSAGE_TYPE_CONVERSION[context["message-type"]];
        message.message = text;

        message.self = self;
        return message;
    }

}