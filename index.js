const Discord = require("discord.js");
const MongoDB = require("mongodb").MongoClient;
const LoggerUtil = require("./utils/logger");
const PluginUtil = require("./utils/plugin");
const Yaml = require("node-yaml");

const Config = Yaml.readSync("config.yml");
const Logger = new LoggerUtil(Config);
const Client = new Discord.Client();
const Plugins = new PluginUtil();
let Database = null;

Client.on("ready", async () => {
    Logger.log(Logger.INFO, "Connected to discord");
});

Client.on("message", async (msg) => {
    if(!msg.author.bot && msg.content.startsWith(Config.bot.prefix))
    {
        let tokens = msg.content.replace(Config.bot.prefix, "").split(" ");
    }
});

MongoDB.connect(Config.database.cluster, {useNewUrlParser: true}).then(dbClient => {
    Database = dbClient.db(Config.database.name);
    Logger.log(Logger.INFO, "Connected to database");
    Client.login(Config.bot.token).catch(err => {
        Logger.log(Logger.ERROR, err.message);
        process.exit(0);
    });
}).catch(err => Logger.log(Logger.ERROR, err.message));