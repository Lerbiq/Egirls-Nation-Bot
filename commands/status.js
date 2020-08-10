const ping = require('minecraft-server-util');
const Discord = require('discord.js');
module.exports = {
    name: 'status',
    description: "Ping command to check the status of the server.",
    async execute(message, args){
        ping('play.egirlsnation.ga', 18001, (error, response) => {
            if(error) throw error;
            const regex = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g
            var playersString = JSON.stringify(response.samplePlayers);
            playersString = playersString.replace(/\[/g,'');
            playersString = playersString.replace(regex , '');
            playersString = playersString.replace(/\]/g, '');
            playersString = playersString.replace(/\"/g,'');
            playersString = playersString.replace(/\{/g,'');
            playersString = playersString.replace(/\}/g,'');
            playersString = playersString.replace(/id/g, '');
            playersString = playersString.replace(/name/g,'');
            playersString = playersString.replace(/:/g,'');
            playersString = playersString.replace(',','');
            playersString = playersString.replace(/,,/g, ', ');
            playersString = playersString.replace('null', 'No players online');

            const Embed = new Discord.MessageEmbed()
            .setTitle('Server status')
            .addField('Server IP', `*${response.host}*`, true)
            .addField('Server version', response.version, true)
            .addField('Online players', response.onlinePlayers + ' / ' + response.maxPlayers)
            .addField('Players', playersString)
            .setFooter("Prefix: `-` | This bot is still under construction")
            .setThumbnail("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")
            .setColor(0xFF0092)
            .setTimestamp();

            message.channel.send(Embed)
            //message.channel.send(playersString)
            //console.log(response);
        })
    }
}