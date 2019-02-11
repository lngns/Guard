const Sys = require("child_process");

module.exports = {
    permission: 3,
    description: "Pulls the most recent update and restarts",
    usage: "pull",
    script: function(args)
    {
        let output = Sys.execSync("git pull");
        args.message.channel.send(args.translator.translate("pullcomplete", [output]));
        setTimeout(() => {
            process.exit(0);
        }, 1500);
    }
};