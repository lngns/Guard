const Sys = require("child_process");

module.exports = {
    permission: 3,
    description: "Pulls the most recent update and restarts",
    usage: "pull",
    script: function(args)
    {
        Sys.execSync("git pull");
        args.message.channel.send(args.translator.translate("pullcomplete", []));
        process.exit(0);
    }
};