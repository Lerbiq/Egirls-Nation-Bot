const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'about',
    description: "Returns some info about the bot in nice embed.",
    async execute(message, args){

        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        /*.setURL('https://discord.egirlsnation.ga/')*/
        .setTimestamp()
        .setAuthor('Lerbiq', 'https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png')
        /*.setImage("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")*/
        .setTitle('About the bot')
        .addField('Version:', '0.0.3', true)
        .addField('Developer:', 'Lerbiq#0420', true)
        .addField('Changelog:', `+ Added auto react to messages in #polls`)
        .setFooter('Prefix: `-` | This bot is still under construction');
        message.channel.send(embed);
    }
}