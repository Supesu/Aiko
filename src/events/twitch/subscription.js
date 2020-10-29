module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(channel, username) {
        this.client.logger.log(
            `${username} subscribed to ${channel}`,
            "log",
            false
        );
    }
};