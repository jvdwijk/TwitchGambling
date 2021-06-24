import { ChatUserstate, Client, Options } from 'tmi.js';
import ChatBot from '../chatbot';
import Message from '../../messages/Message';
import { TwitchMessage } from './twitchMessage';

export default class TwitchChatBot implements ChatBot{

    public static readonly PLATFORM = "Twitch";

    private static readonly TMI_CONNECTED_EVENT = "connected";
    private static readonly TMI_DISCONNECTED_EVENT = "disconnected";
    private static readonly TMI_MESSAGE_EVENT = "message";

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

    public get isConnected(): boolean {
        return this.connected;
    }


    private setEvents(): void {
        this.client.on(TwitchChatBot.TMI_CONNECTED_EVENT, this.setConnected.bind(this, true));
        this.client.on(TwitchChatBot.TMI_DISCONNECTED_EVENT, this.setConnected.bind(this, false));
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

    public async connect(): Promise<void> {
        await this.client
            .connect();
            
        this.connected = true;
        
    }
    public sendMessage(message: string): Promise<[string]>{
        return this.client.say(this.channel, message)
    }

    

    public onMessageRecieved(callback: (message: Message) => void, ignoreOwnMessages: boolean = true): void {
        this.client.on(TwitchChatBot.TMI_MESSAGE_EVENT, (channel: string, context: ChatUserstate, text: string, self: boolean) => {
            if (self && ignoreOwnMessages) {
                return;
            }
            callback(new TwitchMessage(channel, context, text, self))
        })
    }

}