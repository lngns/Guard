class StringUtil
{
    strip(message = "")
    {
        return message.replace(/`|\|/ug, "");
    }
}

module.exports = StringUtil;