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
        if (!translated) {
          let english = Yaml.readSync("../lang/en_US.yml")[phrase]
          for (let p in params) {
            english = english.replace('{}', params[p])
          }
        }
        return translated;
    }
}

module.exports = Translator;