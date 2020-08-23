const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: "Returns bot and API latency in milliseconds.",
    async execute(client, message, args){
        const msg = await message.channel.send(':ping_pong: Pinging...');
        
        const embed = new MessageEmbed()
        .setColor(0xFF0092)
        .setTitle('Pong! :eyes:')
        .setDescription(`:ping_pong: Latency is ${Math.floor(msg.createdTimestamp- message.createdTimestamp)} ms \n\n:gear: API latency is **${Math.round(client.ws.ping)} ms**`)
        .setFooter('Prefix: `-`');

        message.channel.send(embed);
    }
}