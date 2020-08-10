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
        .addField('Version:', '0.0.1', true)
        .addField('Developer:', 'Lerbiq#0240', true)
        .addField('Changelog:', `+ Added some basic commands. Check them with -help 
        \n! If -status doesnt return anything that means server if probably offline or not accessible.`)
        .setFooter('Prefix: `-` | This bot is still under construction');
        message.channel.send(embed);
    }
}