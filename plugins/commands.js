module.exports = {
    permission: 0,
    description: "Returns a list of available bot commands",
    usage: "commands",
    script: function(args)
    {
        let commandList = [];
        let commands = args.plugins.plugins;
        for(let cmd in commands) commandList.push(commands[cmd].name);
        args.message.channel.send(args.translator.translate("commands", [commandList.join(", ")]));
    }
};