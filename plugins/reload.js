module.exports = {
    permission: 3,
    description: "Reload's a command's plugin",
    usage: "reload <module>",
    script: function(args)
    {
        try {
            args.plugins.reload(args.tokens[1]);
            args.message.channel.send(`Reloaded plugin \`${args.tokens[1]}\` successfully`);
        } catch(err) {
            let reason = "```js\n" + err.stack + "```";
            args.message.channel.send(`The plugin \`${args.tokens[1]}\` failed to reload ${reason}`);
        }
    }
};