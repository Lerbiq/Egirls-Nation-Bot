const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'link',
    description: "Tells you how to link your account with discord.",
    async execute(message, args){
        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setTitle(':eyes: How to link accounts')
        .setDescription(`Step 1: You need to execute ` + "`/discord link` command in game.\nStep 2: You will recieve a code. Send that code to this bot in private message.\nStep 3: Profit!")
        .setFooter(`Prefix: ' ${process.env.prefix} '`)
        .setTimestamp();

        
        message.channel.send(embed);
    }
}