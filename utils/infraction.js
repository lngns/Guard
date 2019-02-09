class Infraction
{
    constructor(database = {})
    {
        this.database = database;
    }
    add(user = "", guild = "", reason = "")
    {
        this.database.collection("Infractions").insertOne({
            id: this.database.collection("Infractions").count() + 1,
            userid: user,
            reason: reason,
            guildid: guild
        });
    }
    remove(id = 0)
    {
        this.database.collection("Infractions").deleteOne({ id: id });
    }
    get(id = 0)
    {
        this.database.collection("Infractions").findOne({ id: id }, { limit: 1 });
    }
}

module.exports = Infraction;