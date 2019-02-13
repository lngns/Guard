module.exports = {
    permission: 0,
    description: "Gives information on a command or lists available ones",
    usage: "help <command>",
    script: function(args)
    {
        if(args.plugins.plugins[args.tokens[1]])
        {
            let permissionLevel = args.translator.translate("guildmember", []);
            let plugin = args.plugins.plugins[args.tokens[1]];
            if(plugin.permission <= args.permission)
            {
                if(plugin.permission == 1) permissionLevel = args.translator.translate("guildmoderator", []);
                if(plugin.permission == 2) permissionLevel = args.translator.translate("guildadministrator", []);
                if(plugin.permission == 3) permissionLevel = args.translator.translate("botdeveloper", []);
                args.message.channel.send(args.translator.translate("commandinfo", [
                    args.config.bot.prefix,
                    plugin.usage,
                    plugin.description,
                    permissionLevel
                ]));
            }
        } else if(!args.tokens[1]) {
            let commandList = [];
            let commands = args.plugins.plugins;
            for(let cmd in commands)
            {
                if(commands[cmd].permission <= args.permission)
                {
                    commandList.push(`<${commands[cmd].name}> ${commands[cmd].description}`);
                }
            }
            args.message.channel.send(args.translator.translate("commands", [commandList.join("\n")]));
        } else {
            args.message.channel.send(args.translator.translate("invalidplugin", [args.tokens[1]]));
        }
    }
};