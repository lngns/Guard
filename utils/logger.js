const Chalk = require("chalk");
const Sentry = require("@sentry/node");

class Logger
{
    constructor(config = {})
    {
        this.config = config;
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
}

module.exports = Logger;