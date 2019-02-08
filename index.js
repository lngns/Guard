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
    Client.user.setActivity(Config.bot.prefix + "commands", { type: "WATCHING" });
});

Client.on("message", async (msg) => {
    if(!msg.author.bot && msg.content.startsWith(Config.bot.prefix))
    {
        let permission = 0;
        let tokens = msg.content.replace(Config.bot.prefix, "").split(" ");
        let guild = await Database.collection("Guilds").findOne({ id: msg.guild.id });
        if(guild && guild.modrole && sg.member.roles.exists(guild.modrole)) permission = 1;
        if(msg.member.hasPermission("ADMINISTRATOR") == true) permission = 2;
        if(Config.developers.indexOf(msg.author.id) > -1) permission = 3;
        Plugins.run(tokens[0], {
            message: msg, config: Config, discord: Discord,
            client: Client, tokens: tokens, logger: Logger,
            plugins: Plugins, database: Database
        }, permission);
    }
});

Client.on("guildCreate", async (g) => {
    let guild = await Database.collection("Guilds").findOne({ id: g.id });
    if(guild == null)
    {
        Logger.log(Logger.INFO, `Guild ${g.name} initialized`);
        Database.collection("Guilds").insertOne({
            id: g.id, owner: g.ownerID, modrole: null, 
            muterole: null, logchannel: null, infractions: {},
            antiraid: {enabled: false, type: 0}, antispam: {enabled: false, level: 1},
            antihoist: {enabled: false, list:[]}, filters: {enabled: false, list: []}
        });
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