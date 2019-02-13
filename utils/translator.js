const Yaml = require("node-yaml");
const Sys = require("fs");

class Translator
{
    constructor(config = {})
    {
        this.available = Sys.readdirSync("lang", {withFileTypes: false}).replace(/\.yml/ug, "").join(", ");
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

          return english;
        }

        return translated;
    }
    change(locale = "")
    {
        this.locale = Yaml.readSync("../lang/" + locale + ".yml"); 
    }
}

module.exports = Translator;