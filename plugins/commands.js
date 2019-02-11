module.exports = {
    permission: 0,
    description: "Returns a list of available bot commands",
    usage: "commands",
    script: function(args)
    {
        let commandList = [];
        let commands = args.plugins.plugins;
        for(let cmd in commands)
        {
            if(commands[cmd].permission <= args.permission)
            {
                commandList.push(`${commands[cmd].name} - ${commands[cmd].description}`);
            }
        }
        args.message.channel.send(args.translator.translate("commands", [commandList.join("\n")]));
    }
};