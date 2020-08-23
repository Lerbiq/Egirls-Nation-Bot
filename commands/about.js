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
        .addField('Version:', '0.1.0', true)
        .addField('Developer:', 'Lerbiq#0420', true)
        .addField('Changelog:', `! First stable release yay
        \n+ Added urban disctionary command
        \n + Added !ip command for when someone asks for ip
        \n + Added website to some of the embeds`)
        .setFooter('Prefix: `-`');
        message.channel.send(embed);
    }
}