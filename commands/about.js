const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'about',
    description: "Returns some info about the bot in nice embed.",
    async execute(message, args){

        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setURL('https://egirlsnation.ga/')
        .setTimestamp()
        .setAuthor('Lerbiq', 'https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png')
        /*.setImage("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")*/
        .setTitle('About the bot')
        .addField('Version:', '0.1.1', true)
        .addField('Developer:', 'Lerbiq#0420', true)
        .addField('Changelog:', `
        \n + Added blacklist for some profanities
        \n + Added -players command`)
        .setFooter('Prefix: `-`');
        message.channel.send(embed);
    }
}