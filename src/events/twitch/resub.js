module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(channel, username, months, message, userstate, methods) {
        this.client.logger.log(
            `${username} re-subscribed to ${channel} | ${months}:${message}`,
            "log",
            false
        );
    }
};