module.exports = {
    name: 'poll',
    description: "Reacts to every message in #polls",
    async execute(message, args){
        message.react('✅');
        message.react('❎');
    }
}