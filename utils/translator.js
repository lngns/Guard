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
        if (!translated) return Yaml.readSync("../lang/en_US.yml")[phrase]
        return translated;
    }
}

module.exports = Translator;