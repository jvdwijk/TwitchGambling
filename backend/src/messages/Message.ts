import MessageType from "./messageType";

export default interface Message{
    readonly platform: string;
    readonly channel: string;

    readonly sender: string;
    readonly senderIsMod: boolean;
    readonly messageType: MessageType;
    readonly message: string;

    readonly self: boolean;
}