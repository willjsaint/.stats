const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = ".";
var timestamp = require('console-timestamp');
var cloudscraper = require('cloudscraper');
var fs = require('fs');
var sleep = require('sleep');
const open = require('open');
var screenshot = require('desktop-screenshot');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
bot.on("ready", function() {
    console.log(".ready HAS STARTED on " + timestamp('YYYY/MM/DD hh:mm'));
});

bot.on("message", function(message) {
    console.log(timestamp('[MM/DD hh:mm:ss] ') + message.author.username + ": " + message.content); //Logs every message sent to the console with the #channel it was sent in
    if (!message.content.startsWith(PREFIX)) return; //Ignore messages that dont include the prefix

    var args = message.content.substring(PREFIX.length).split(" "); //checks for the prefix
    switch (args[0].toLowerCase()) {
        case "help": //sends author of .help command a list of commands
            message.author.send("Commands: \n .help - sends this dialouge \n" +
                ".stats <user> - lists the stats of a user.");
            break;
        case "stats": //get .stats
        var sn = message.content.substr(7); 
        var options = {
            uri: "https://play.esea.net/api/users/"+sn+"/stats",
            JSON: true,
        }
        cloudscraper.get(options).then((data, err) => {
            let obj = JSON.parse(data);
            let serverStats = obj.data['server_stats'],
                rws = serverStats.stats.filter(i => i.name === 'all.rws').shift().value,
                adr = serverStats.stats.filter(i => i.name === 'all.adr').shift().value,
                wins = serverStats.record.win,
                loss = serverStats.record.loss,
                ties = serverStats.record.tie,
                hsp = serverStats.stats.filter(i => i.name === 'all.hs_percentage').shift().value;
            //message.channel.send('\`RWS: ' +rws+", ADR: " +adr+" Wins/Losses: " +wins+"/"+loss+" ("+ratio+")"+", Headshot Percentage: " +hsp+"\`");
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
            title: "Stats for "+sn+".",
            url: 'https://play.esea.net/users/'+sn+"/stats",
            description: "ESEA Stats for discord",
            fields: [{
                name: "RWS: "+rws,
                value: "Round Win Shares",
              },
              {
                name: "ADR: "+adr,
                value: "Average Damage per Round",
              },
              {
                name: "Wins: "+wins,
                value: "Wins this month",
              },
              {
                name: "Losses: "+loss,
                value: "Losses this month",
              },
              {
                name: "Ties: "+ties,
                value: "Ties this month",
              },
              {
                name: "Headshot Percentage: "+hsp,
               value: "Headshots per shots hit",
              },
            ],
            footer: {
              icon_url: bot.user.avatarURL,
              text: "https://play.esea.net/users/1289631"
            }
          }
            });
        });
        break;
        default:
            message.channel.send('Invalid command, use .help to see a list of commands');

        }
    }
);
bot.login('key');
