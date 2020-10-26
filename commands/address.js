const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'address',
    description: "Gives you the IP.",
    async execute(message, args){
        const Embed = new MessageEmbed()
                    .setTitle(':white_check_mark: Server IP:')
                    .addField('IP:', `*play.egirlsnation.ga*`)
                    .setFooter(`Prefix: ' ${process.env.prefix} '`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")
                    .setColor(0xFF0092)
                    .setTimestamp();
        
        message.channel.send(Embed);
    }
}