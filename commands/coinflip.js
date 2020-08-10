module.exports = {
    name: 'coinflip',
    description: "Flips a coin. Self explanatory.",
    async execute(message, args){
        var heads = 0, tails = 0;
        message.channel.send("Flipping coin 3 times.")
        for(var i = 0; i < 3; i++){
            setTimeout(function(){
                if(Math.random() < 0.50){
                    heads++;
                    message.channel.send("Heads.")
                }
                else{
                    tails++;
                    message.channel.send("Tails.")
                }
            }, 1000);
        }
        setTimeout(function(){
            message.channel.send("Heads: " + heads + " Tails: " + tails);
        }, 1000);
        
    }
}