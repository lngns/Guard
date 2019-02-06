const Discord = require("discord.js");
const LoggerUtil = require("./utils/logger");
const Yaml = require("node-yaml");

const Config = Yaml.readSync("config.yml");
const Logger = new LoggerUtil(Config);
const Client = new Discord.Client();

Client.on("ready", async () => {
    Logger.log(Logger.INFO, "Connected to discord");
});

Client.on("message", async (msg) => {});

Client.login(Config.bot.token);