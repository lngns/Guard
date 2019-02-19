const Discord = require("discord.js");
const MongoDB = require("mongodb").MongoClient;
const LoggerUtil = require("./utils/logger");
const PluginUtil = require("./utils/plugin");
const TranslationUtil = require("./utils/translator");
const InfractionUtil = require("./utils/infraction");
const CachetApi = require("cachet-api");
const Yaml = require("node-yaml");

const Config = Yaml.readSync("config.yml");
const Translator = new TranslationUtil(Config);
const Client = new Discord.Client({ sync: true });
const Logger = new LoggerUtil(Config, Client);
const Plugins = new PluginUtil();
let Infractions = null;
let Database = null;

Client.on("ready", async () => {
    Logger.log(Logger.INFO, Translator.translate("connected", ["Discord"]));
    Client.user.setActivity(Config.bot.prefix + "help", { type: "WATCHING" });
    Infractions = new InfractionUtil(Database);
    if(Config.cachet.enabled)
    {
        const Cachet = new CachetApi({
            url: Config.cachet.url,
            apiKey: Config.cachet.key
        });
        setInterval(() => {
            Cachet.publishMetricPoint({
                id: 1,
                value: Client.ping.toFixed(0)
            });
        }, Config.cachet.interval * 1000);
    }
});

Client.on("message", async (msg) => {
    if(!msg.author.bot && msg.content.startsWith(Config.bot.prefix))
    {
        let permission = 0;
        let tokens = msg.content.replace(Config.bot.prefix, "").split(" ");
        let guild = await Database.collection("Guilds").findOne({ id: msg.guild.id });
        if(guild && guild.modrole && msg.member.roles.some(g => g.id == guild.modrole)) permission = 1;
        if(msg.member.hasPermission("ADMINISTRATOR") == true) permission = 2;
        if(Config.developers.indexOf(msg.author.id) > -1) permission = 3;
        if(guild) Translator.change(guild.locale);
        Plugins.run(tokens[0], {
            message: msg, config: Config, discord: Discord,
            client: Client, tokens: tokens, logger: Logger,
            plugins: Plugins, database: Database, translator: Translator,
            infractions: Infractions, permission: permission
        }, permission);
    }
});

Client.on("guildCreate", async (g) => {
    let guild = await Database.collection("Guilds").findOne({ id: g.id });
    if(guild == null)
    {
        Logger.log(Logger.INFO, Translator.translate("initialized", [g.name]));
        Database.collection("Guilds").insertOne({
            id: g.id, owner: g.ownerID, modrole: null, muterole: null, logchannel: null,
            antiraid: {enabled: false, type: 0}, antispam: {enabled: false, time: 0, count: 0},
            antihoist: {enabled: false, list:[]}, filters: {enabled: false, list: []},
            autorole: null, locale: "en_US", tags: {}, selfroles: []
        });
    }
});

Client.on("messageDelete", async (msg) => {
    if(msg != null)
    {
        let guild = await Database.collection("Guilds").findOne({ id: msg.guild.id });
        if(guild) Translator.change(guild.locale);
        if(guild && guild.logchannel != null) Logger.push(guild, Translator.translate("gmessagedeleted", [
            msg.content,
            msg.author.tag,
            msg.author.id
        ]));
    }
});

MongoDB.connect(Config.database.cluster, {useNewUrlParser: true}).then(dbClient => {
    Database = dbClient.db(Config.database.name);
    Logger.log(Logger.INFO, Translator.translate("connected", ["MongoDB"]));
    Client.login(Config.bot.token).catch(err => {
        Logger.log(Logger.ERROR, err.message);
        process.exit(0);
    });
}).catch(err => Logger.log(Logger.ERROR, err.message));