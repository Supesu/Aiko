// imports
const tmi = require("tmi.js");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const klaw = require("klaw");

class TwitchClient {
  constructor(config) {
    this.config = config;
  }

  async start() {
    this.client = new tmi.client({
      identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_AUTH,
      },
      channels: ["whynotbefriends"],
    });

    this.client.connect();
    this.client.logger = require("./utils/Logger");
    this.client.wait = promisify(setTimeout);

    this.loadEvents();
    this.loadCommands();
  }

  async loadCommands() {
    klaw("./src/commands/").on("data", (item) => {
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
    const evtFiles = await readdir("./src/events/twitch");
    this.client.logger.log(
      `Loading a total of ${evtFiles.length} events.`,
      "log"
    );
    evtFiles.forEach((file) => {
      const eventName = file.split(".")[0];
      this.client.logger.log(`Loading Event: ${eventName}`);
      const event = new (require(`./events/twitch/${file}`))(this.client);
      this.client.on(eventName, (...args) => event.run(...args));
      delete require.cache[require.resolve(`./events/twitch/${file}`)];
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

module.exports = TwitchClient;
