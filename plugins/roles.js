module.exports = {
    permission: 1,
    description: "Lists all the roles in the guild with ids",
    usage: "roles",
    script: function(args)
    {
        let roleStr = [];
        let roles = args.message.guild.roles.array();
        roles.splice(0, 1);
        for(let role in roles)
        {
            let r = roles[role];
            roleStr.push(r.name + " <" + r.id + ">");
        }
        args.message.channel.send("```md\n" + roleStr.join("\n") + "```\n");
    }
};