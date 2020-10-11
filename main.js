const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const usedCommandRecently = new Set();
const blacklist = require("./blacklist.json");
const client = new Discord.Client();
const prefix= process.env.prefix;

const fs = require('fs');
const { execute } = require('./commands/status');

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
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

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
            }else if(command === 'players'){
                client.commands.get('players').execute(message, args);
            }else if(command === 'stats'){
                client.commands.get('stats').execute(message, args);
            }else if (command === 'link'){
                client.commands.get('link').execute(message, args);
            }
        }
        if(command === 'ip'){
            client.commands.get('address').execute(message, args);
        }else if(command === 'ud'){
            client.commands.get('urban').execute(message, args);
        }else if(command === 'bonk'){
            client.commands.get('bonk').execute(message, args);
        }
    }

    if(message.content.toLowerCase().endsWith('yes or no?') || message.content.toLowerCase().endsWith('yesorno?') || message.content.toLowerCase().endsWith('yes or no') || message.content.toLowerCase().endsWith('yesorno')){
        client.commands.get('yesorno').execute(message, args);
    }else if(message.content.toLowerCase().includes('nogger')){
        client.commands.get('nogger').execute(message, args);
    }
    if(message.content.startsWith("👀")){
        client.commands.get('eyes').execute(message, args);
    }
    if(message.channel.id === '719867374769274951'){
        client.commands.get('poll').execute(message, args);
    }else if(message.channel.id === '720441896102527086'){
        client.commands.get('bruh').execute(message,args);
    }

    if(blacklist.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))){
        message.delete();
    }else if(message.content.toLowerCase() === 'cp')
        message.delete();
});

client.login(process.env.token);