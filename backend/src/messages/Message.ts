import MessageType from "./messageType";

export default class Message{
    public platform: string;
    public channel: string;

    public sender: string;
    public senderIsMod: boolean;
    public messageType: MessageType;
    public message: string;

    public self: boolean;
}