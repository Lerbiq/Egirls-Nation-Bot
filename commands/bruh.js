const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bruh',
    description: "Returns bruh",
    async execute(message, args){
        //message.channel.send('This works');
        message.react('🇧');
        message.react('🇷');
        message.react('🇺');
        message.react('🇭');
    }
}