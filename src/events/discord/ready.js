module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {

        await this.client.wait(1000);

        this.client.appInfo = await this.client.fetchApplication();
        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);

        this.client.user.setActivity(`${process.env.PREFIX}help`);
        this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.cache.size} users in ${this.client.guilds.cache.size} servers.`, "ready", true);

        // TODO: { Post to API for website to call }
    }
};