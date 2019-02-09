const Yaml = require("node-yaml");

class Translator
{
    constructor(config = {})
    {
        this.locale = Yaml.readSync("../lang/" + config.bot.locale + ".yml");        
    }
    translate(phrase = "", params = [])
    {
        let translated = this.locale[phrase];
        for(let p in params)
        {
            translated = translated.replace("{}", params[p]);
        }
        
        return translated;
    }
}

module.exports = Translator;