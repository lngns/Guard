module.exports = {
    permission: 2,
    description: "Allows admins to change guild options",
    usage: "config <key> <subkey> [value]",
    script: async function(args)
    {
        let updates = {};
        let failed = false;
        let guild = await args.database.collection("Guilds").findOne({ id: args.message.guild.id });
        switch(args.tokens[1])
        {
            case "locale":
                if(!args.tokens[2]) args.message.channel.send(args.translator.translate("availablelocales", [args.translator.available]));
                break;
            case "modrole":
                args.tokens.splice(0, 2);
                var role = args.message.guild.roles.find(r => r.name == args.tokens.join(" "));
                if(role) updates.modrole = role.id;
                else failed = true;
                break;
            case "muterole":
                args.tokens.splice(0, 2);
                var role = args.message.guild.roles.find(r => r.name == args.tokens.join(" "));
                if(role) updates.muterole = role.id;
                else failed = true;
                break;
            case "logchannel":
                var channel = args.message.guild.channels.find(c => c.name == args.tokens[2]);
                if(channel) updates.logchannel = channel.id;
                else failed = true;
                break;
            case "antiraid":
                switch(args.tokens[2])
                {
                    case "toggle":
                        var value = !guild.antiraid.enabled;
                        updates.antiraid = {};
                        updates.antiraid.enabled = value;
                        break;
                    case "type":
                        updates.antiraid = {};
                        if(args.tokens[3] == "kick") updates.antiraid.type = 0;
                        if(args.tokens[3] == "ban") updates.antiraid.type = 1;
                        if(args.tokens[3] == "mute") updates.antiraid.type = 2;
                        break;
                }
                break;
        }
        if(Object.keys(updates).length > 0)
        {
            if(!failed) { 
                args.message.channel.send(args.translator.translate("configupdated", [])); 
                args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.id }, { "$set": updates });
            } else args.message.channel.send(args.translator.translate("configfailed", []));
        }
    }
};