const { MessageEmbed, Channel } = require("discord.js");

module.exports = {
    name: 'players',
    description: "Gives you the count of registered players",
    async execute(message, args) {
        var mysql = require('mysql');
        var regPlayerCount = 'null';

        var connection = mysql.createConnection({
            host: process.env.dbHost,
            user: process.env.dbUser,
            password: process.env.dbPassword,
            database: process.env.dbName,
            debug: false,
        });

        console.log("Connecting to the database...")
        connection.connect(function (err) {
            if (err) throw err;
            console.log("Connected to the database, starting query.");
            var sql = "select COUNT(*) from authme";

            connection.query(sql, function (err, result) {
                if (err) throw err;
                regPlayerCount = JSON.stringify(result);
                regPlayerCount = regPlayerCount.replace(/\[/g, '');
                regPlayerCount = regPlayerCount.replace(/\]/g, '');
                regPlayerCount = regPlayerCount.replace(/\{/g, '');
                regPlayerCount = regPlayerCount.replace(/\}/g, '');
                regPlayerCount = regPlayerCount.replace(/\'/g, '');
                regPlayerCount = regPlayerCount.replace(/\[/g, '');
                regPlayerCount = regPlayerCount.replace(/COUNT/g, '');
                regPlayerCount = regPlayerCount.replace(/\(/g, '');
                regPlayerCount = regPlayerCount.replace(/\)/g, '');
                regPlayerCount = regPlayerCount.replace(/\*/g, '');
                regPlayerCount = regPlayerCount.replace(/:/g, '');
                regPlayerCount = regPlayerCount.replace(/\"/g, '');
                console.log("Ending connection.");
                connection.end();
                console.log("Connection ended.");
                const embed = new MessageEmbed()
                    .setColor(0xFF0092)
                    .setTitle(':eyes: Registered players')
                    .setDescription(`There is **` + regPlayerCount + `** registered players on Anarchy!`)
                    .setFooter('Prefix: `-`');
                message.channel.send(embed);
            });
        });
    }
}