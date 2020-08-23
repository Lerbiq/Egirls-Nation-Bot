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
        .addField('-ud <search | random> <term>', 'Gives you the deffinition of the term from Urban Dictionary.')
        .addField('-ip', 'Gives you the ip. (Usefull when new people ask for it)')
        .setFooter('Prefix: `-`');
        message.channel.send(embed);
    }
}