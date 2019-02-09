module.exports = {
    permission: 3,
    description: "Reloads a command's plugin",
    usage: "reload <plugin>",
    script: function(args)
    {
        if(args.plugins.plugins[args.tokens[1]])
        {
            try {
                args.plugins.reload(args.tokens[1]);
                args.message.channel.send(args.translator.translate("reloadsuccess", [args.tokens[1]]));
            } catch(err) {
                let reason = "```js\n" + err.stack + "```";
                args.message.channel.send(args.translator.translate("reloadfail", [
                    args.tokens[1],
                    reason
                ]));
            }
        } else {
            args.message.channel.send(args.translator.translate("invalidplugin", [args.tokens[1]]));
        }
    }
};