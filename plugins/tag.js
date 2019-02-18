module.exports = {
    permission: 1,
    description: "Allows users to save 'tags' or text commands",
    usage: "tag <add/remove/tag> <tag> [content]",
    script: async function(args)
    {
        let guild = await args.database.collection("Guilds").findOne({ id: args.message.guild.id });
        let tags = guild.tags;
        
        switch(args.tokens[1])
        {
            case "add":
                let tagContent = "";
                for(let i = 3; i < args.tokens.length; i += 1)
                {
                    tagContent += args.tokens[i] + " ";
                }
                tagContent = tagContent.trimRight();
                tags[args.tokens[2]] = tagContent;
                args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.id }, { "$set": { tags: tags } }, { upsert: false });
                args.message.channel.send(args.translator.translate("tagadded", [args.tokens[2]]));
                args.logger.push(guild, args.translator.translate("gtagremoved", [
                    args.tokens[2], 
                    args.message.author.tag, 
                    args.message.author.id
                ]));
                break;
            case "remove":
                delete tags[args.tokens[2]];
                args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.id }, { "$set": { tags: tags } }, { upsert: false });
                args.message.channel.send(args.translator.translate("tagremoved", [args.tokens[2]]));
                args.logger.push(guild, args.translator.translate("gtagremoved", [
                    args.tokens[2], 
                    args.message.author.tag, 
                    args.message.author.id
                ]));
                break;
            default:
                if(tags[args.tokens[1]]) args.message.channel.send(tags[args.tokens[1]]);
                else args.message.channel.send(args.translator.translate("invalidtag", [args.tokens[1]]));
                break;
        }
    }
};