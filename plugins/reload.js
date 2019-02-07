module.exports = {
    permission: 3,
    description: "Reloads a command's plugin",
    usage: "reload <module>",
    script: function(args)
    {
        if(args.plugins.plugins[args.tokens[1]])
        {
            try {
                args.plugins.reload(args.tokens[1]);
                args.message.channel.send(`Reloaded plugin \`${args.tokens[1]}\` successfully`);
            } catch(err) {
                let reason = "```js\n" + err.stack + "```";
                args.message.channel.send(`The plugin \`${args.tokens[1]}\` failed to reload ${reason}`);
            }
        } else {
            args.message.channel.send(`The plugin \`${args.tokens[1]}\` does not exist`);
        }
    }
};