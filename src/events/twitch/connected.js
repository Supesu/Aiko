module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(port, address) {
        this.client.logger.log(
            "Twitch client ready (" + address + ":" + port +")",
            "ready",
            false
        )
    }
};