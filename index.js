//ODQzODk5ODcyOTEzNjUzNzgy.YKKlAA.ZLGlL4rTCf01dvgyeMPaNoJJgqY

const express = require('express');
const app = express();
const port = 3000;
const { Util } = require('discord.js')

app.get('/', (req, res) => res.send('Hello Big Wide World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./2nd.js')

var fs = require('fs');
var quotes = fs.readFileSync('quote.txt').toString().split("\n");

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});


prefix = '='
client.on('message', msg => {
  if (msg.author.bot) return;

  if (msg.content === `${prefix}setup`) {
    const command = require('./2nd.js')
    command.execute(msg)
    .then((sentMessage) => msg.delete({ timeout: 10000 }))
    .catch(console.error);
  }
  
  if (msg.content === prefix + 'speed') {  
    if (msg.member.roles.cache.some(role => role.name === 'Admin')){
      msg.channel
      .send(`Latency is:\n${Date.now() - msg.createdTimestamp}ms.\nAPI Latency is:\n${Math.round(client.ws.ping)}ms`)
      .then((sentMessage) => msg.delete({ timeout: 10000 }))
      .catch(console.error);
    }
  }

  if (msg.content === prefix + 'quote') {
    var x = Math.floor(Math.random() * 50);
    const randomItem = quotes[Math.floor(Math.random() * quotes.length)].replace(/,["\{}]+/g, "");
    //if (randomItem.content === ',') {
    //  randomItem = randomItem.replace(',', quotes[x])
    //}
    if(randomItem.indexOf(",") !== -1){
	    msg.channel
      .send(quotes[Math.floor(Math.random() * quotes.length)].replace(",", ""))
      //.send(quotes[Math.floor(Math.random() * quotes.length)].replace(/["\{}],+/g, ""))
      .then((sentMessage) => msg.delete({ timeout: 100 }))
      .catch(console.error);
    }
    else{
      msg.channel
      .send(randomItem)
      .then((sentMessage) => msg.delete({ timeout: 100 }))
      .catch(console.error);
    }
  }
  if (msg.content === prefix + 'clear') {
    if (msg.member.roles.cache.some(role => role.name === 'Admin')){
      async function wipe() {
          var msg_size = 100;
          while (msg_size == 100) {
              await msg.channel.bulkDelete(100)
          .then(messages => msg_size = messages.size)
          .catch(console.error);
          }
      }
      wipe()
    }
  }

});

client.login(process.env.TOKEN);
