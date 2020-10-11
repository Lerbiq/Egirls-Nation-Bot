const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'about',
    description: "Returns some info about the bot in nice embed.",
    async execute(message, args){

        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setURL('https://github.com/Lerbiq/Egirls-Nation-Bot/')
        .setTimestamp()
        .setAuthor('Lerbiq', 'https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png')
        /*.setImage("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")*/
        .setTitle('About the bot')
        .addField('Version:', '0.2.0', true)
        .addField('Developer:', 'Lerbiq#3077', true)
        .addField('Changelog:', `
        \n + Added commands for fetching statistics from the server
        \n + Added link command for linking discord and ingame account
        \n + Added bonk account for lewd people
        \n + Small changes in embeds and code`)
        .setFooter(`Prefix: ' ${process.env.prefix} '`)
        message.channel.send(embed);
    }
}