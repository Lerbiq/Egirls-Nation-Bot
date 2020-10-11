const { MessageEmbed } = require("discord.js");
const ping = require("./ping.js");
const about = require("./about.js");
const address = require("./address.js");
const bonk = require("./bonk.js");
const coinflip = require("./coinflip.js");
const link = require("./link.js");
const players = require("./players.js");
const stats = require("./stats.js");
const status = require("./status.js");
const urban = require("./urban.js");
const yesorno = require("./yesorno.js");

module.exports = {
    name: 'help',
    description: "Returns bot commands in nice embed.",
    async execute(message, args){

        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setTitle('Commands')
        .addField('-help', this.description)
        .addField('-about', about.description)
        .addField('-ping', ping.description)
        .addField('-status', status.description)
        .addField('-coinflip', coinflip.description)
        .addField('<question> Yes or no?', yesorno.description)
        .addField('-ud <search | random> <term>', urban.description)
        .addField('-ip', address.description)
        .addField('-players', players.description)
        .addField('-stats <playername>',stats.description)
        .addField('-link', link.description)
        .addField('-bonk', bonk.description)
        .setFooter(`Prefix: ' ${process.env.prefix} '`)
        message.channel.send(embed);
    }
}