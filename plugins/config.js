module.exports = {
    permission: 2,
    description: "Allows admins to change guild options",
    usage: "config <key> <subkey> [value]",
    script: function(args)
    {
        let updates = {};
        let failed = false;
        switch(args.tokens[1])
        {
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
        }
        if(!failed) { 
            args.message.channel.send(args.translator.translate("configupdated", [])); 
            args.database.collection("Guilds").findOneAndUpdate({ id: args.message.guild.id }, { "$set": updates });
        } else args.message.channel.send(args.translator.translate("configfailed", []));
    }
};