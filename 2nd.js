const Discord = require('discord.js');

const menu = new Discord.MessageEmbed()
  .setTitle('Options: ')
  .setDescription('Here are the different options for this bot=')
  .addField('--> 1 = Casino', 'Change prices of items and payout amount=')
  .addField(
    '--> 2 = Quotes',
    'Change around the quotes eg add a quote to the quote list',
  )
  .addField('--> 3 = Moderation', 'Kick, Ban members and much more')
  .addField('--> More to come in the future', 'Leave come suggetions=')
  .setImage(
    'https://www.bolero.net/wp-content/uploads/2020/11/inr-banner-sercure.jpg',
  );

const casino = new Discord.MessageEmbed()
  .setTitle('--> Casino:')
  .setDescription('Here are the different options under the Casino section=')
  .addField(
    '----> Change payout range on **slot machine**',
    'Type \`=SLR = Min(number), Max(number)\`',
  )
  .addField(
    '----> Change payout range on **blackjack**',
    'Type \`=BJR = Min(number), Max(number)\`',
  )
  .addField(
    '----> Change payout range on **cock fight**',
    'Type \`=CFR = Min(number), Max(number)\`',
  )
  .addField(
    '----> Change price of **chicken** for **cock fight**',
    'Type \`=CFP = Price\`',
  )
  .addField(
    '----> Change price of **lottery tickets**',
    'Type \`=LTP = x1(number), x5(number), x10(number), x100(number)\`',
  )
  .setImage(
    'https://www.startus.cc/sites/default/files/styles/company_profile_cover_crop/public/img-casino.jpg?itok=E1XXjp5b&sc=775a4769d2582602853a3c7b3efeed6f',
  );

const quote = new Discord.MessageEmbed()
  .setTitle('--> Quotes:')
  .setDescription('Here are the different options under the Casino section=')
  .addField('----> Clear ** ALL quotes**', 'Type \`=clear quotes\`')
  .addField(
    '----> Add to quotes',
    'Type \`=Add quote... - `First name, Last name\`',
  )
  .addField('----> Remove a quote', 'Type \`=Remove quote....\`')
  .setImage(
    'https://www.startus.cc/sites/default/files/styles/company_profile_cover_crop/public/img-casino.jpg?itok=E1XXjp5b&sc=775a4769d2582602853a3c7b3efeed6f',
  );

const mod = new Discord.MessageEmbed()
  .setTitle('--> Moderation:')
  .setDescription('Here are the different options under the Casino section=')
  .addField('----> Ban a member', 'Type \`=Ban @member\`')
  .addField('----> Warn a member', 'Type \`=Warn @member\`')
  .addField('----> Create a self role message', 'Type \`=Create\`')
  .addField('----> Clear the whole of a channel your currently in', 'Type \`=ClearChannel\`')
  .setImage(
    'https://www.startus.cc/sites/default/files/styles/company_profile_cover_crop/public/img-casino.jpg?itok=E1XXjp5b&sc=775a4769d2582602853a3c7b3efeed6f',
  );

module.exports = {
  async execute(message) {
    // just send that menu
    await message.channel.send(menu);

    // filter checks if the response is from the author who typed the command
    const filter = (response) => response.author.id === message.author.id;
    const maxWait = 10000; // in ms

    // set up a message collector to check if there are any responses
    const collector = message.channel.createMessageCollector(filter, {
      // set up the max wait time the collector runs
      // it's optional though
      time: maxWait,
    });
    // fires when a response is collected
    collector.on('collect', (response) => {
      if (response.content === '1') {
        return message.channel.send(casino)
        .then(msg => msg.delete({ timeout: 10000 }));
      }
      if (response.content === '2') {
        return message.channel.send(quote)
        .then(msg => msg.delete({ timeout: 10000 }));
      }
      if (response.content === '3') {
        return message.channel.send(mod)
        .then(msg => msg.delete({ timeout: 10 }));
      }
    });

    // fires when the collector is finished collecting
    collector.on('end', (collected, reason) => {
      // only send a message when the "end" event fires because of timeout
      if (reason !== 'time') return;

      message.channel.send(
        `Okay, ${message.author}, I'm bored and I can't wait any longer. If you want to see the menu again, type \`=setup\` again`).then(msg => msg.delete({ timeout: 10000 }));
    });
  },
};
