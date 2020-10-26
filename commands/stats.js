const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'stats',
    description: "Fetches players ingame stats in a nice embed.",
    async execute(message, args) {
        var playername, offlineAPIresult, onlineAPIresult, uuid, onlineUUID, playTime, convertedTime, mobKills, deaths, playerKills, KDR, avatarURL, discordTag, discordField, rankName, avgPing, minPing, maxPing, skinName, avatarURLfinal;
        const uuidRegex = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;
        const uuidRegexShort = /[a-fA-F0-9]{32}/g;
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        var offlineAPIurl = "http://tools.glowingmines.eu/convertor/nick/";

        if (!args[0]) {
            message.channel.send("You need to provide a player name. Or did you mean `" + `${process.env.prefix}status` + "` ?");
        } else if (args[1]) {
            message.channel.send("That's not how it works. Try `" + `${process.env.prefix}` + "stats <playername>` .");
        } else if (/^[a-zA-Z0-9_]*$/.test(args[0]) == true) {
            playername = args[0];
            offlineAPIurl = offlineAPIurl + playername;

            var nameLowercase = String(playername);
            nameLowercase = nameLowercase.toLowerCase();

            const offlineResponse = await fetch(offlineAPIurl);
            const offlineJson = await offlineResponse.json();

            offlineAPIresult = JSON.stringify(offlineJson);
            uuid = offlineAPIresult.match(uuidRegex);

            var mysql = require('mysql');

            var connection = mysql.createConnection({
                host: process.env.dbHost,
                user: process.env.dbUser2,
                password: process.env.dbPassword2,
                debug: false,
                multipleStatements: true,
            });

            function msToTime(duration) {
                var milliseconds = parseInt((duration % 1000) / 100),
                    seconds = Math.floor((duration / 1000) % 60),
                    minutes = Math.floor((duration / (1000 * 60)) % 60),
                    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;

                return hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
            }

            console.log("[MySQL] Connecting to the database...")
            connection.connect(function (err) {
                if (err) throw err;
                console.log(`[MySQL] Connected to the database.\n[MySQL_Query] Starting query for player ${playername}.`);
                var sql = `SELECT SUM(survival_time + creative_time + spectator_time) FROM ${process.env.dbName2}.plan_world_times WHERE uuid ='${uuid}';
                            SELECT SUM(mob_kills) FROM ${process.env.dbName2}.plan_sessions WHERE uuid = '${uuid}';
                            SELECT SUM(deaths) FROM ${process.env.dbName2}.plan_sessions WHERE uuid = '${uuid}';
                            SELECT COUNT(killer_uuid) FROM ${process.env.dbName2}.plan_kills WHERE killer_uuid = '${uuid}';
                            SELECT string_value FROM ${process.env.dbName2}.plan_extension_user_values WHERE string_value REGEXP '^[@]' and uuid = '${uuid}';
                            SELECT col_2_value FROM ${process.env.dbName2}.plan_extension_user_table_values WHERE col_1_value = "primarygroup" and uuid = '${uuid}';
                            SELECT avg(avg_ping) FROM ${process.env.dbName2}.plan_ping WHERE uuid = '${uuid}';
                            SELECT min(min_ping) FROM ${process.env.dbName2}.plan_ping WHERE uuid = '${uuid}';
                            SELECT max(max_ping) FROM ${process.env.dbName2}.plan_ping WHERE uuid = '${uuid}';
                            SELECT Skin FROM ${process.env.dbName3}.Players WHERE Nick = '${nameLowercase}'`;

                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("[MySQL] Ending connection.");
                    connection.end();
                    console.log("[MySQL] Connection ended.");

                    result = JSON.stringify(result);
                    result = result.split(',');
                    playTime = result[0];
                    mobKills = result[1];
                    deaths = result[2];
                    playerKills = result[3];
                    discordTag = result[4];
                    rankName = result[5];
                    avgPing = result[6];
                    minPing = result[7];
                    maxPing = result[8];
                    skinName = result[9];
                    playTime = playTime.match(/(\d[\d\.]*)/g);
                    mobKills = mobKills.match(/(\d[\d\.]*)/g);
                    deaths = deaths.match(/(\d[\d\.]*)/g);
                    playerKills = playerKills.match(/(\d[\d\.]*)/g);
                    discordTag = discordTag.match(/\w+#\d{4}/iu);
                    rankName = rankName.replace(/\[{"col_2_value":"\[/g, '');
                    rankName = rankName.replace(/]"}]/g, '');
                    avgPing = avgPing.match(/(\d[\d\.]*)/g);
                    minPing = minPing.match(/(\d[\d\.]*)/g);
                    maxPing = maxPing.match(/(\d[\d\.]*)/g);
                    var pom = skinName.match(/\"(.*?)\"/g);
                    if (pom == null) {
                        void(0);
                    } else {
                        skinName = pom[1];
                        skinName = skinName.replace(/\"/g, '');
                    }

                    if (deaths == null || mobKills == null || playTime == null) {
                        console.log(`[MySQL] Player ${playername} isn't in the database.`)
                        const errorEmbed = new Discord.MessageEmbed()
                            .setColor(0xFF0092)
                            .setTitle(':face_with_monocle: Something went wrong.')
                            .setDescription(`Player **${playername}** isnt in the database.`)
                            .setFooter(`Prefix: ' ${process.env.prefix} '`)
                            .setTimestamp();
                        message.channel.send(errorEmbed);
                    } else {
                        playTime = playTime.map(Number);
                        mobKills = mobKills.map(String);
                        deaths = deaths.map(String);
                        playerKills = playerKills.map(String);

                        if (avgPing == null) {
                            avgPing = "-";
                        } else if (avgPing != null) {
                            avgPing = parseFloat(avgPing);
                            avgPing = Math.round((avgPing + Number.EPSILON) * 100) / 100;
                        }

                        if (minPing == null) {
                            minPing = "-";
                        }
                        if (maxPing == null) {
                            maxPing = "-";
                        }

                        convertedTime = msToTime(playTime);

                        if (playerKills == 0 && deaths == 0) {
                            KDR = 0;
                        } else if (playerKills == 0 && deaths != 0) {
                            KDR = 0;
                        } else if (playerKills != 0 && deaths == 0) {
                            KDR = playerKills;
                        } else {
                            KDR = playerKills / deaths;
                        }

                        if (discordTag != null) {
                            discordTag = discordTag.map(String);
                            discordField = '@' + discordTag;
                        } else if (discordTag == null) {
                            discordField = "This user doesn't have his account linked.";
                        }

                        switch (rankName) {
                            case "owner":
                                rankName = "Owner";
                                break;
                            case "default":
                                rankName = "NewFag";
                                break;
                            case "veteran":
                                rankName = "MidFag";
                                break;
                            case "discord-staff":
                                rankName = "Discord Staff"
                                break;
                            default:
                                rankName = "Err: Couldn't get rank.";
                        }

                        if (pom == null) {
                            avatarURL = "https://minotar.net/avatar/" + playername + "/300";
                            avatarURL = avatarURL.replace(/ /gm, '');
                        } else if (skinName != null) {
                            avatarURL = "https://minotar.net/avatar/" + skinName + "/300";
                            avatarURL = avatarURL.replace(/ /gm, '');
                        }
                        
                        console.log(avatarURL);

                        const Embed = new Discord.MessageEmbed()
                            .setTitle(`:chart_with_upwards_trend: Statistics for ${args}`)
                            .addField(`:crown:  Rank`, `${rankName}`)
                            .addField(`:hourglass: Playtime`, `${convertedTime}`)
                            .addField(`:crossed_swords: Kills`, `${playerKills}`, true)
                            .addField(`:skull_crossbones: Deaths`, `${deaths}`, true)
                            .addField(`:muscle: K/D ratio`, `${KDR}`, true)
                            .addField(`:skull: Mob kills`, `${mobKills}`)
                            .addField(`:ok_hand: Min. Ping`, `${minPing}`, true)
                            .addField(`:satellite: Avg. Ping`, `${avgPing}`, true)
                            .addField(`:warning: Max. Ping`, `${maxPing}`, true)
                            .addField(`:incoming_envelope: Discord tag:`, `${discordField}`)
                            .setFooter(`You can link accounts with: ' ${process.env.prefix}link '`)
                            .setThumbnail(avatarURL)
                            .setColor(0xFF0092)
                            .setTimestamp();

                        message.channel.send(Embed);
                    }
                });
            });
        } else if (/^[a-zA-Z0-9_]*$/.test(args[0]) == false) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(0xFF0092)
                .setTitle(':face_with_monocle: Something went wrong.')
                .setDescription(`The name **${args[0]}** contains invalid characters.\nAllowed characters are: ` + "`A-Z, a-z, 0-9, _` .")
                .setFooter(`Prefix: ' ${process.env.prefix} '`)
                .setTimestamp();
            message.channel.send(errorEmbed);
        } else {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(0xFF0092)
                .setTitle(':face_with_monocle: Something went wrong.')
                .setDescription(`Something weird happened. Try again.`)
                .setFooter(`Prefix: ' ${process.env.prefix} '`)
                .setTimestamp();
            message.channel.send(errorEmbed);
        }
    }
}