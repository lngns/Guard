module.exports = {
    permission: 0,
    description: "Gives information on a command",
    usage: "help <command>",
    script: function(args)
    {
        if(args.plugins.plugins[args.tokens[1]])
        {
            let permissionLevel = "Guild Member";
            let plugin = args.plugins.plugins[args.tokens[1]];
            if(plugin.permission == 1) permissionLevel = "Guild Moderator";
            if(plugin.permission == 2) permissionLevel = "Guild Administrator";
            if(plugin.permission == 3) permissionLevel = "Bot Developer";
            args.message.channel.send("```md\n" + args.config.bot.prefix + plugin.usage + "\n" + plugin.description + "\nPermission Level: " + permissionLevel + "```")
        } else if(!args.tokens[1]) {
            args.message.channel.send(`Enter a plugin to get information on`);
        } else {
            args.message.channel.send(`The plugin \`${args.tokens[1]}\` does not exist`);
        }
    }
};