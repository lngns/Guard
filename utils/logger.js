const Chalk = require("chalk");
const Sentry = require("@sentry/node");
const moment = require("moment");
const StringUtil = require("./string");
const String = new StringUtil();

class Logger
{
    constructor(config = {}, client = {})
    {
        this.config = config;
        this.client = client;
        this.INFO = 0;
        this.ERROR = 1;
        this.WARNING = 2;
        this.DEBUG = 3;
        if(config.sentry.enabled) Sentry.init({
            dsn: config.sentry.dsn
        });
    }
    log(logType = 0, message = "")
    {
        let time = new Date().toISOString();
        switch(logType)
        {
            case 0:
                if(this.config.sentry.enabled) Sentry.captureMessage(message, Sentry.Severity.Info);
                console.log(time + Chalk.green(" info -> ") + message);
                break;
            case 1:
                if(this.config.sentry.enabled) Sentry.captureMessage(message, Sentry.Severity.Error);
                console.log(time + Chalk.red(" erro -> ") + message);
                break;
            case 2:
                if(this.config.sentry.enabled) Sentry.captureMessage(message, Sentry.Severity.Warning);
                console.log(time + Chalk.yellow(" warn -> ") + message);
                break;
            case 3:
                if(this.config.sentry.enabled) Sentry.captureMessage(message, Sentry.Severity.Debug);
                console.log(time + Chalk.blue(" debg -> ") + message);
                break;
        }
    }
    push(guild, message)
    {
        let cleanMessage = String.strip(message);
        let Time = "[`" + moment().format("HH:MM:SS") + "`] ";
        if(guild.logchannel) this.client.guilds.get(guild.id).channels.get(guild.logchannel).send(Time + cleanMessage);
    }
}

module.exports = Logger;