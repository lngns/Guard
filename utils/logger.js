const Chalk = require("chalk");

class Logger
{
    constructor(config = {})
    {
        this.config = config;
        this.INFO = 0;
        this.ERROR = 1;
        this.WARNING = 2;
        this.DEBUG = 3;
    }
    log(logType = 0, message = "")
    {
        let time = new Date().toISOString();
        switch(logType)
        {
            case 0:
                console.log(time + Chalk.green(" info -> ") + message);
                break;
            case 1:
                console.log(time + Chalk.red(" erro -> ") + message);
                break;
            case 2:
                console.log(time + Chalk.yellow(" warn -> ") + message);
                break;
            case 3:
                console.log(time + Chalk.blue(" debg -> ") + message);
                break;
        }
    }
}

module.exports = Logger;