module.exports = {
    permission: 1,
    description: "Allows users to save 'tags' or text commands",
    usage: "tag <add/remove/use> <tag>",
    script: async function(args)
    {
        let tags = await args.database.collection("Guilds").findOne({ id: args.message.guild.id }).tags;
        switch(args.tokens[1])
        {
            case "add":
                let tagContent = "";
                for(let i = 3; i < args.tokens.length; i += 1)
                {
                    tagContent += args.tokens[i] + " ";
                }
                tags[args.tokens[2]] = tagContent;
                args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.update }, { "$set": { tags: tags } }, { upsert: false });
                break;
            case "remove":
                delete tags[args.tokens[2]];
                args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.update }, { "$set": { tags: tags } }, { upsert: false });
                break;
            case "use":
                args.message.channel.send(tags[args.tokens[2]]);
                break;
        }
    }
};