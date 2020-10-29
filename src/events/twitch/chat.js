module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(channel, user, message, self) {

        // run some twitch specific checks
        if (self) return;   
        if (message.content.indexOf(process.env.PREFIX) !== 0) return;

        // log command
        this.client.logger.log("(Twitch): " + message, "cmd", false)
    
        // format message

        // run message handler
    }
};