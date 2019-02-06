const Sys = require("fs");

class Plugin
{
    constructor(name = "")
    {
        this.name = name;
        this.module = require("../plugins/" + name);
        this.description = this.module.description;
        this.permission = this.module.permission;
        this.script = this.module.script;
        this.usage = this.module.usage;
    }
    reload()
    {
        delete require.cache[require.resolve("../plugins/" + this.name)];
        this.module = require("../plugins/" + this.name);
        this.description = this.module.description;
        this.permission = this.module.permission;
        this.script = this.module.script;
        this.usage = this.module.usage;
    }
}

class PluginManager
{
    constructor()
    {
        this.plugins = {};
        Sys.readdir("plugins", (err, files) => {
            if(err) throw new Error(err.message);
            files.forEach(file => {
                let plugin = file.replace(".js", "");
                this.plugins[plugin] = new Plugin(plugin);
            });
        });
    }
    run(name, args, permission)
    {
        if(this.plugins[name] != null)
        {
            if(this.plugins[name].permission <= permission)
            {
                this.plugins[name].script(args);
            }
        }
    }
    reload(name)
    {
        this.plugins[name].reload();
    }
}

module.exports = PluginManager;