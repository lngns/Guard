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
    async get(id = 0, guild = "")
    {
        let infraction = await this.database.collection("Infractions").findOne({ id: id, guildid: guild }, { limit: 1 });
        if(infraction.available) return infraction;

        return null;
    }
    async search(user = "", guild = "", index = 0)
    {
        let infractions = await this.database.collection("Infractions").find({ userid: user, guildid: guild }, { limit: 10, skip: index });
        
        return infractions;
    }
}

module.exports = Infraction;