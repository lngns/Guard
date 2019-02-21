class StringUtil
{
    escape(message = "")
    {
        return message.replace(/(`|\||\n|\{|\})/ug, " ");
    }
}

module.exports = StringUtil;