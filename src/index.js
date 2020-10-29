/**
 * Boot file for the bot
 */
// Check node version
if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) < 14) throw new Error("Requires node ^v14.0.0 to run properly")

// Load .env file
process.argv[2] == "prod" ? console.log("Booting into production mode, not loading .env") : require('dotenv').config({ path: "./src/config/dev/.env" })

// Import clients
const discordClient = new (require("./discord.js"))();
const twitchClient = new (require("./twitch.js"))();

// Runnning both asynchronous
Promise.all([discordClient.start(), twitchClient.start()]);