import Message from "../messages/Message";

type messageRecievedCallback = (message: Message) => void;

export default interface ChatBot{
    readonly isConnected: boolean;

    connect: () => Promise<unknown>;
    sendMessage: (message: string) => Promise<unknown>;
    onMessageRecieved: (callback: messageRecievedCallback, allowSelf: boolean) => void;
    
}