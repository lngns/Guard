const Yaml = require("node-yaml");
const StringUtil = require("./string");
const String = new StringUtil();
const Sys = require("fs");

class Translator
{
    constructor(config = {})
    {
        this.available = Sys.readdirSync("lang", {withFileTypes: false}).join(", ").replace(/\.yml/ug, "");
        this.locale = Yaml.readSync("../lang/" + config.bot.locale + ".yml");      
    }
    translate(phrase = "", params = [])
    {
        let translated = this.locale[phrase];
        try {
            for(let p in params)
            {
                translated = translated.replace("{}", params[p] ? String.strip(params[p]) : params[p]);
            }
        } catch(err) {
            let english = Yaml.readSync("../lang/en_US.yml")[phrase];
            for(let p in params) {
                english = english.replace("{}", params[p] ? String.strip(params[p]) : params[p]);
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