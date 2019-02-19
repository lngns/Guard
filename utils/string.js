class StringUtil
{
    strip(message = "")
    {
        return message.replace(/`|\||\n/ug, " ");
    }
}

module.exports = StringUtil;