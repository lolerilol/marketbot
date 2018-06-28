const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");


module.exports.run = async (bot, message, args) => {
  //!pay

  if(!coins[message.author.id]){
    return message.reply("You Dont Have Any Coins 😭")
  }

let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

if(!coins[pUser.user.id]){
  coins[pUser.user.id] = {
    coins: 0
  };
}

let pCoins = coins[pUser.user.id].coins;
let sCoins = coins[message.author.id].coins;

if(sCoins < args[0]) return message.reply("Not Enough Coins!");
if(message.author.id === pUser.user.id) return message.channel.send("Can't pay yourself.")

coins[message.author.id] = {
  coins: sCoins - parseInt(args[1])
};

coins[pUser.user.id] = {
  coins: pCoins + parseInt(args[1])
};

message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins!`);

fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if(err) console.log(err)
});



}

module.exports.help = {
  name: "pay"
}
