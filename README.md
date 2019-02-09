# Guard
Guard is a moderation and utility bot written in JavaScript. 
It is meant to be modular, secure as well as powerful. The bot uses modules such as Sentry, MongoDB, and Discord.JS. 
The bot was created to sort of be a utilitarian bot that makes moderation and management of servers simple as possible, 
while still being powerful. 

### Setup
1. Install Node from `https://nodejs.org`, latest is reccomended
2. Clone the repo by doing `git clone https://github.com/FalseData/Guard.git`
3. Install the bot's dependencies with `npm install`
4. Rename `config.example.yml` to `config.yml`
5. Customize all the values in the config to desired values
6. In MongoDB Atlas (assuming you're using it) create a database called `Guard`
7. Make the default collection in the database `Guilds`
8. Create another collection with the name `Infractions`
9. Finally run the bot with `npm start`

### Support
[![Server Banner](https://discordapp.com/api/guilds/542549878987816960/embed.png?style=banner2)](https://discord.gg/neAuN9n)