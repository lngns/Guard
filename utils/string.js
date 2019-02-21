class StringUtil
{
    escape(message = "")
    {
        return message.replace(/(`|\||\n|\{|\})/ug, "\\$1");
    }
}

module.exports = StringUtil;