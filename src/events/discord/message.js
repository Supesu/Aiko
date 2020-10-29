module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    // run discord specific checks
    if (message.author.bot) return;
    if (
      message.guild &&
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;
    if (message.content.indexOf(process.env.PREFIX) !== 0) return;

    // Log command
    this.client.logger.log(
      "(Discord): " + message.content.toLowerCase(),
      "cmd",
      true
    );

    // format message => object
    let formattedMessage = "test";
    
    // run message handler
    require("../message")(formattedMessage);
  }
};
