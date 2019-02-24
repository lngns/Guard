class StringUtil
{
    escape(message = "")
    {
        return message.replace(/(`|\||\{\})/ug, " ");
    }
}

module.exports = StringUtil;