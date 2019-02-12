const Sys = require("child_process");

module.exports = {
    permission: 3,
    description: "Pulls the most recent update and restarts",
    usage: "pull",
    script: function(args)
    {
        let output = Sys.execSync("git pull");
        if(output != "Already up to date.")
        {
            args.message.channel.send(args.translator.translate("pullcomplete", [output]));
            setTimeout(() => {
                process.exit(0);
            }, 1500);
        } else {
            args.message.channel.send(args.translator.translate("pullfailed", []));
        }
    }
};