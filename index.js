const Discord = require("discord.js");
const Yaml = require("node-yaml");

const Config = Yaml.readSync("config.yml");
const Client = new Discord.Client();

Client.on("ready", async () => {});

Client.on("message", async (msg) => {});

Client.login(Config.bot.token);