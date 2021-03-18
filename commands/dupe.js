module.exports = {
    name: 'dupe',
    description: "When someone asks about the dupe do this command.",
    async execute(message, args){
        message.channel.send("Tutorial:\nhttps://youtu.be/4udNQQkmhVE");
    }
}