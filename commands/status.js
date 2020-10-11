const ping = require('minecraft-server-util');
const Discord = require('discord.js');
module.exports = {
    name: 'status',
    description: "Ping command to check the status of the anarchy server.",
    async execute(message, args) {
        if (args[0] && !args[1]) {
            message.channel.send("Did you mean `" + `${process.env.prefix}stats ${args[0]}` + "` ?");
        } else if(args[1]){
            message.channel.send("That's not how it works. Try `" + `${process.env.prefix}` +"status` .")
        }else{
            try {
                var serverError;
                var playersString = 'null';
                var serverIP = 'play.egirlsnation.ga';
                const regex = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;
                ping(serverIP, 18001, (error, response) => {
                    if (error) serverError = error;
                    if (serverError != null) {
                        const EmbedError = new Discord.MessageEmbed()
                            .setTitle(':warning: Server status')
                            .setDescription(`**Server offline**`)
                            .addField('Server IP', `*${serverIP}*`, true)
                            .addField('Server version', '-', true)
                            .addField('Online players', '-')
                            .addField('Players', 'No players online')
                            .setFooter("Prefix: `-`")
                            .setThumbnail("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")
                            .setColor(0xFF0092)
                            .setTimestamp();
                        message.channel.send(EmbedError);
                    }
                    else {
                        //playersString = 'No players online';
                        playersString = JSON.stringify(response.samplePlayers);
                        playersString = playersString.replace(/\[/g, '');
                        playersString = playersString.replace(regex, '');
                        playersString = playersString.replace(/\]/g, '');
                        playersString = playersString.replace(/\"/g, '');
                        playersString = playersString.replace(/\{/g, '');
                        playersString = playersString.replace(/\}/g, '');
                        playersString = playersString.replace(/id/g, '');
                        playersString = playersString.replace(/name/g, '');
                        playersString = playersString.replace(/:/g, '');
                        playersString = playersString.replace(',', '');
                        playersString = playersString.replace(/,,/g, ', ');
                        playersString = playersString.replace('null', 'No players online');

                        const Embed = new Discord.MessageEmbed()
                            .setTitle(':white_check_mark: Server status')
                            .setDescription(`**Server online**`)
                            .addField('Server IP', `*${response.host}*`, true)
                            .addField('Server version', response.version, true)
                            .addField('Online players', response.onlinePlayers + ' / ' + response.maxPlayers)
                            .addField('Players', playersString)
                            .setFooter(`Prefix: ' ${process.env.prefix} '`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/705540588346278029/711938831191900180/fghjkl.png")
                            .setColor(0xFF0092)
                            .setTimestamp();

                        message.channel.send(Embed);
                    }

                    //message.channel.send(serverError);
                    //message.channel.send(playersString)
                    //console.log(response);
                })
            } catch (error) {
                console.error(error);
            }
        }
    }
}