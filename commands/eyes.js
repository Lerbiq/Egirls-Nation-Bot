module.exports = {
    name: 'eyes',
    description: "Sends eyes when you do",
    async execute(message, args){
        message.channel.send(":eyes:");
    }
}