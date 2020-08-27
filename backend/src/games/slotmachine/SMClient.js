class SMClient {

    constructor(connection) {
        this._connection = connection;
    }

    async playSlotmachine(numbers, user) {
        return new Promise((resolve, reject) => {
            this._connection.emit("play-slots", { numbers, user }, (err) => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}

module.exports = SMClient;