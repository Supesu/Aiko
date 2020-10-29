<h1 align="center">
    <br>
    <a herf=""><img src="https://cdn.discordapp.com/avatars/769071220632977438/3821259510b8ae8c95253db18446ffe4.png?size=256" alt="Aiko Discord Bot" width="200"></a>
    <br>
    <br>
    Aiko
    <br>
</h1>

<h4 align="center">A Open source Twitch & Discord bot desgined for moderation & gaming.</h4>

<p align="center"> 
        <img src="https://img.shields.io/badge/Discord.js%20Version-%5E12.4.1-orange">
        <img src="https://img.shields.io/github/package-json/v/Supesu/Aiko/master?label=Version&color=green" alt="version">
        <img src="https://img.shields.io/badge/Tmi.js%20Version-%5E1.5.0-orange">
</p>

<p align="center">
    <a href="#how-to-use">How To Use</a> •
    <a href="#key-features">Key Features</a> •
    <a href="#local-instance">Local instance</a> •
    <a href="#cloud-instance">Cloud instance</a> •
    <a href="#license">License</a> •
    <a href="#credits">Credits</a>
</p>

## How to use

## Key features

## Local instance

To clone and run these bots on a local machine, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download) (which comes with [npm](http://npmjs.com))<br>
Installed on your computer. From your command line run the following commands:

```bash
# Clone the repository from github
$ git clone https://github.com/Supesu/Aiko

# CD into the cloned repository
$ cd Aiko

# Install required librarys
~/Aiko$ npm install
```
Then you will need to setup the config file located in the root directory.<br>
create a file called ".env" and inside of it put this (replacing { } with with a variable when required).<br>

```bash
DISCORD_TOKEN={} # Authentication token used to communicate with discord's api
LOG_CHANNEL_SERVER={(CODE OR FALSE)} # Main discord's id or 'false' to not log anything  
LOG_CHANNEL_CHANNEL={(CODE OR FALSE)} # Main discord's log channel or 'false' to not log anything
```
Then run the following command to start the bot
```bash
# Run start script
~/Aiko$ npm start
``` 

## Cloud instance

## License

## Credits