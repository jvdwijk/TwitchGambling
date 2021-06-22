import { Socket } from "socket.io";


export default class SMClient {

    private readonly connection: Socket;

    public constructor(connection: Socket) {
        this.connection = connection;
    }

    public playSlotmachine(numbers: string[], user: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.emit("play-slots", { numbers, user }, (err: unknown) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        })
    }
}

module.exports = SMClient;