const { MessageEmbed } = require("discord.js");
const ping = require("./ping");

module.exports = {
    name: 'help',
    description: "Returns bot commands in nice embed.",
    async execute(message, args){

        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setTitle('Commands')
        .addField('-help', this.description)
        .addField('-about', 'Returns some info about the bot in nice embed.')
        .addField('-ping', 'Returns bot and API latency in milliseconds.')
        .addField('-status', 'Gives you information about the anarchy server.')
        .addField('-coinflip', 'Flips a coin. Self explanatory.')
        .addField('<question> Yes or no?', 'Gives you an aswer.')
        .setFooter('Prefix: `-` | This bot is still under construction');
        message.channel.send(embed);
    }
}