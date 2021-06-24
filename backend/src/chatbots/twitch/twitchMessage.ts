import { ChatUserstate } from "tmi.js";
import Message from "../../messages/Message";
import MessageType from "../../messages/messageType";
import TwitchChatBot from "./twitchChatbot";

const TWITCH_MESSAGE_TYPE_CONVERSION: Record<string, MessageType>  = {
    "whisper": MessageType.DIRECT,
    "actions": MessageType.COMMAND,
    "chat": MessageType.PUBLIC,
}

export class TwitchMessage implements Message {
    public readonly platform: string;
    public readonly channel: string;
    public readonly sender: string;
    public readonly senderIsMod: boolean;
    public readonly messageType: MessageType;
    public readonly message: string;
    public readonly self: boolean;

    public constructor(channel: string, context: ChatUserstate, text: string, self: boolean){
        this.platform = TwitchChatBot.PLATFORM;
        this.channel = channel;

        this.sender = context["display-name"];
        this.senderIsMod = this.checkForUserModPrivileges(context);
        this.messageType = TWITCH_MESSAGE_TYPE_CONVERSION[context["message-type"]];
        this.message = text;

        this.self = self;
    }

    private checkForUserModPrivileges(user: ChatUserstate): boolean{
        return user.mod || (user.badges !== null && user.badges.broadcaster === '1');
    }

}