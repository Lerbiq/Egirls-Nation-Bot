const Discord = require('discord.js');
const usedCommandRecently = new Set();

const client = new Discord.Client();
const prefix= '-';

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Egirls Nation bot is online.');
    client.user.setActivity('your mom', {
        type: 'WATCHING'
    }).catch(console.error);
})

client.on('message', message =>{
    if(/*!message.content.startsWith(prefix) ||*/ message.author.bot) return; //Ignores messages that doesnt start with the prefix or are from a bot.

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(message.content.startsWith(prefix)){
        if(message.channel.id === '723456721036509195' || message.channel.id === '721406898267750510'){
            if(command === 'ping'){
                client.commands.get('ping').execute(client, message, args);
            }else if(command === 'coinflip'){
                client.commands.get('coinflip').execute(message, args);
            }else if(command === 'status'){
                client.commands.get('status').execute(message, args);
            }else if(command === 'help'){
                client.commands.get('help').execute(message, args);
            }else if(command === 'about'){
                client.commands.get('about').execute(message, args);
            }
        }
    }

    if(message.content.toLowerCase().endsWith('yes or no?') || message.content.toLowerCase().endsWith('yesorno?')){
        client.commands.get('yesorno').execute(message, args);
    }
    if(message.content.startsWith("👀")){
        client.commands.get('eyes').execute(message, args);
    }
});

client.login('NzQyMDc0NDQwOTI1MzE1MTM0.XzA0rQ.An_tSI1HYvfDJ4CiD8fqR4MqGuY');