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
            guildid: guild,
            available: true
        });
    }
    remove(id = 0)
    {
        this.database.collection("Infractions").findOneAndUpdate({ id: id }, { "$set": { available: false }}, { upsert: false });
    }
    async get(id = 0)
    {
        let infraction = await this.database.collection("Infractions").findOne({ id: id }, { limit: 1 });
        if(infraction.available) return infraction;

        return null;
    }
}

module.exports = Infraction;