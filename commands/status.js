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
                var serverIP = '172.18.0.1';
                const regex = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;
                ping(serverIP, 18001, (error, response) => {
                    if (error) serverError = error;
                    if (serverError != null) {
                        const EmbedError = new Discord.MessageEmbed()
                            .setTitle(':warning: Server status')
                            .setDescription(`**Server offline**`)
                            .addField('Server IP', `*play.egirlsnation.com*`, true)
                            .addField('Server version', '-', true)
                            .addField('Online players', '-')
                            .addField('Players', 'No players online')
                            //.setFooter("Planned downtime: 21. 1. 2021 11am UTC - 3pm UTC. Bot may not function during the time.")
                        	.setFooter(`Prefix: ' ${process.env.prefix} '`)
                            .setThumbnail("https://egirlsnation.com/wp-content/uploads/2021/01/cropped-egirls_nation_new.png")
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
                            .addField('Server IP', `*play.egirlsnation.com*`, true)
                            .addField('Server version', response.version, true)
                            .addField('Online players', response.onlinePlayers + ' / ' + response.maxPlayers)
                            .addField('Players', playersString)
                            //.setFooter("Planned downtime: 21. 1. 2021 11am UTC - 3pm UTC. Bot may not function during the time.")
                        	.setFooter(`Prefix: ' ${process.env.prefix} '`)
                            .setThumbnail("https://egirlsnation.com/wp-content/uploads/2021/01/cropped-egirls_nation_new.png")
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