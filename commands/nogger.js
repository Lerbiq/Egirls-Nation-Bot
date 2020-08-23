const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nogger',
    description: "Returns nogger",
    async execute(message, args){
        //message.channel.send('This works');
        message.react('🇳');
        message.react('🇴');
        message.react('🇬');
        message.react('↪️');
        message.react('🇪');
        message.react('🇷');
    }
}