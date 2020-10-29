// imports
const { Client, Collection } = require("discord.js");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const klaw = require("klaw");

class DiscordClient {
  constructor(config) {
    this.config = config;
  }

  async start() {
    this.client = new Client({ disableMentions: "everyone" });
    this.client.login(process.env.TOKEN);

    this.prefix = process.env.PREFIX;
    this.cooldowns = new Collection();

    this.client.logger = require("./utils/Logger");
    this.client.wait = promisify(setTimeout);

    this.loadEvents();
    this.loadCommands();
  }

  async loadCommands() {
    klaw("./src/commands").on("data", (item) => {
      const cmdFile = path.parse(item.path);
      if (!cmdFile.ext || cmdFile.ext !== ".js") return;
      const response = client.loadCommand(
        cmdFile.dir,
        `${cmdFile.name}${cmdFile.ext}`
      );
      if (response) client.logger.error(response);
    });
  }

  async loadEvents() {
    const evtFiles = await readdir("./src/events/discord/");
    this.client.logger.log(
      `Loading a total of ${evtFiles.length} events.`,
      "log",
      true
    );
    evtFiles.forEach((file) => {
      const eventName = file.split(".")[0];
      this.client.logger.log(`Loading Event: ${eventName}`, "log", true);
      const event = new (require(`./events/discord/${file}`))(this.client);
      this.client.on(eventName, (...args) => event.run(...args));
      delete require.cache[require.resolve(`./events/discord/${file}`)];
    });
  }

  async loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }
}

module.exports = DiscordClient;
