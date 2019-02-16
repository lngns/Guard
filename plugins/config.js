module.exports = {
    permission: 2,
    description: "Allows admins to change guild options",
    usage: "config <key> <value/subkey> [value]",
    script: async function(args)
    {
        let updates = {};
        let guild = await args.database.collection("Guilds").findOne({ id: args.message.guild.id });
        switch(args.tokens[1])
        {
            case "locale":
                if(!args.tokens[2]) args.message.channel.send(args.translator.translate("availablelocales", [args.translator.available]));
                else updates.locale = args.tokens[2];
                break;
            case "modrole":
                args.tokens.splice(0, 2);
                updates.modrole = args.message.guild.roles.find(r => r.name == args.tokens.join(" ")).id;
                break;
            case "autorole":
                args.tokens.splice(0, 2);
                updates.autorole = args.message.guild.roles.find(r => r.name == args.tokens.join(" ")).id;
                break;
            case "muterole":
                args.tokens.splice(0, 2);
                updates.muterole = args.message.guild.roles.find(r => r.name == args.tokens.join(" ")).id;
                break;
            case "logchannel":
                updates.logchannel = args.message.guild.channels.find(c => c.name == args.tokens[2]).id;
                break;
            case "antiraid":
                updates.antiraid = { enabled: guild.antiraid.enabled, type: guild.antiraid.type };
                switch(args.tokens[2])
                {
                    case "toggle":
                        updates.antiraid.enabled = !guild.antiraid.enabled;
                        break;
                    case "type":
                        if(args.tokens[3] == "kick") updates.antiraid.type = 0;
                        if(args.tokens[3] == "ban") updates.antiraid.type = 1;
                        if(args.tokens[3] == "mute") updates.antiraid.type = 2;
                        break;
                }
                break;
            case "antispam":
                updates.antispam = { enabled: guild.antispam.enabled, time: guild.antispam.time, count: guild.antispam.count };
                switch(args.tokens[2])
                {
                    case "toggle":
                        updates.antispam.enabled = !guild.antispam.enabled;
                        break;
                    case "time":
                        updates.antispam.time = parseInt(args.tokens[3], 10);
                        break;
                    case "count":
                        updates.antispam.count = parseInt(args.tokens[3], 10);
                        break;
                }
                break;
            case "selfroles":
                let role = null;
                let selfroles = guild.selfroles;
                switch(args.tokens[2])
                {
                    case "add":
                        args.tokens.splice(0, 3);
                        role = args.message.guild.roles.find(r => r.name == args.tokens.join(" "));
                        selfroles.push(role.id);
                        updates.selfroles = selfroles;
                        break;
                    case "remove":
                        args.tokens.splice(0, 3);
                        role = args.message.guild.roles.find(r => r.name == args.tokens.join(" "));
                        selfroles.splice(selfroles.indexOf(role.id), 1);
                        updates.selfroles = selfroles;
                        break;
                }
                break;
            case "antihoist":
                let chars = guild.antihoist.list;
                updates.antihoist = { enabled: guild.antihoist.enabled, list: guild.antihoist.list };
                switch(args.tokens[2])
                {
                    case "toggle":
                        updates.antihoist.enabled = !guild.antihoist.enabled;
                        break;
                    case "add":
                        chars.push(args.tokens[3]);
                        updates.antihoist.list = chars;
                        break;
                    case "remove":
                        chars.splice(chars.indexOf(args.tokens[3]), 1);
                        updates.antihoist.list = chars;
                        break;
                }
                break;
            case "filters":
                let filters = guild.filters.list;
                updates.filters = { enabled: guild.filters.enabled, list: guild.filters.list };
                switch(args.tokens[2])
                {
                    case "toggle":
                        updates.filters.enabled = !guild.filters.enabled;
                        break;
                    case "add":
                        filters.push(args.tokens[3]);
                        updates.filters.list = filters;
                        break;
                    case "remove":
                        filters.splice(filters.indexOf(args.tokens[3]), 1);
                        updates.filters.list = filters;
                        break;
                }
                break;
        }
        if(Object.keys(updates).length > 0)
        {
            let key = Object.keys(updates)[0];
            args.message.channel.send(args.translator.translate("configupdated", [key])); 
            args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.id }, { "$set": updates });
        }
    }
};