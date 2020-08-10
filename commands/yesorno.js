module.exports = {
    name: 'yesorno',
    description: "Answers yes or no to a message ending with Yes or no?",
    async execute(message, args){
        var yes = 0, no = 0;
        for(var i = 0; i < 100; i++){
                if(Math.random() < 0.50){
                    yes++;
                }
                else{
                    no++;
                }
        }
        if(yes > no){
            message.channel.send('Yes!');
        }
        else{
            message.channel.send('No.');
        }

    }
}