module.exports = {
    permission: 2,
    description: "Initializes or resets a guild's config",
    usage: "setup",
    script: async function(args)
    {
        let g = args.message.guild;
        let guild = await args.database.collection("Guilds").findOne({ id: g.id });
        if(guild == null)
        {
            args.database.collection("Guilds").insertOne({
                id: g.id, owner: g.ownerID, modrole: null, muterole: null, logchannel: null,
                antiraid: {enabled: false, type: 0}, antispam: {enabled: false, time: 0, count: 0},
                antihoist: {enabled: false, list:[]}, filters: {enabled: false, list: []}
            });
            args.message.channel.send(args.translator.translate("guildinit", []));
        } else {
            args.message.channel.send(args.translator.translate("guildreset", [])).then(msg => {
                let filter = ms => ms.author.id == args.message.author.id;
                msg.channel.awaitMessages(filter, {max: 1, time: 60000}).then(col => {
                    if(col.size > 0)
                    {
                        if(col.first().content == "confirm")
                        {
                            args.database.collection("Guilds").findOneAndUpdate({ id: g.id }, { "$set": {
                                id: g.id, owner: g.ownerID, modrole: null, muterole: null, logchannel: null,
                                antiraid: {enabled: false, type: 0}, antispam: {enabled: false, time: 0, count: 0},
                                antihoist: {enabled: false, list:[]}, filters: {enabled: false, list: []}
                            }});
                            args.message.channel.send(args.translator.translate("guildinit", []));
                        } else {
                            args.message.channel.send(args.translator.translate("guildcancel", []));
                        }
                    }
                });
            });
        }
    }
};