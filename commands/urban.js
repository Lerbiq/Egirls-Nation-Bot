const urban = require("urban");
const { MessageEmbed } = require("discord.js");
const { cyan } = require("../colours.json");


module.exports = {
    name: 'urban',
    description: "Gets urban dictionary deffinition",
    async execute(message, args){
        if(!args[0] || !["search", "random"].includes(args[0])) return message.channel.send("`-urban <search|random> (query)`");
        let image = "https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch=s180-rw";
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
            try {
                search.first(res => {
                    if(!res) return message.channel.send("No results found for this topic, sorry!");
                    let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;

                        let embed = new MessageEmbed()
                            .setColor(cyan)
                            .setAuthor(`Urban Dictionary | ${word}`, image)
                            .setThumbnail(image)
                            .setDescription(`**Defintion:** ${definition || "No definition"}
                            **Example:** ${example || "No Example"}
                            **Upvote:** ${thumbs_up || 0}
                            **Downvote:** ${thumbs_down || 0}
                            **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                            .setTimestamp()
                            .setFooter(`Written by ${author || "unknown"}`);

                            message.channel.send(embed)
                })
            } catch(e) {
                console.log(e)
                return message.channel.send("looks like i've broken! Try again")
            }
        }
    }
