class Infraction
{
    constructor(database = {})
    {
        this.database = database;
    }
    async add(user = "", guild = "", reason = "")
    {
        let count = await this.database.collection("Infractions").countDocuments();
        this.database.collection("Infractions").insertOne({
            id: count + 1,
            userid: user,
            reason: reason,
            guildid: guild
        });
    }
    remove(id = 0)
    {
        this.database.collection("Infractions").deleteOne({ id: id });
    }
    async get(id = 0)
    {
        let infraction = await this.database.collection("Infractions").findOne({ id: id }, { limit: 1 });
        
        return infraction;
    }
}

module.exports = Infraction;