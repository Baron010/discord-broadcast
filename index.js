const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "#"
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const cooldown = new Set()
  client.on("message", async message => {
    let msgCount = 0;

        let errorCount = 0;

        let successCount = 0;
        let sent = '📤';
        let cant = '❌';
        let rcv = '📥';
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLocaleLowerCase()
    switch (command) {
    case "bc" :
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**U don't have `Manage_Messages` permission**")
      if(!args[0]) return;

      var args2 = args.slice(1).join(" ").replace('[sender]', message.author.username).replace('[server]', message.guild.name).replace('[channel]', message.channel.name).replace('[members]', message.guild.members.size).replace('[owner]', message.guild.owner.user.username).replace('[roles]', message.guild.roles.size).replace('[online]', message.guild.members.filter(m=>m.presence.status == 'online').size + message.guild.members.filter(m=>m.presence.status == 'dnd').size +  message.guild.members.filter(m=>m.presence.status == 'idle').size).replace('[offline]', message.guild.members.filter(m=>m.presence.status == 'offline').size)
      if(args[0] === message.guild.roles.find(r => r.id === args[0]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[0]))){
        if(!args[1]) return;
        let getRole = message.guild.roles.find(r => r.id === args[0]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[0]));
        if (cooldown.has(message.author.id)) {
          if(message.author.bot) return;
          return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
          message.delete(5000)
          })
          }
          cooldown.add(message.author.id);
          setTimeout(() => {
            cooldown.delete(message.author.id);

          }, 7200000);

      let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **${getRole} Memebrs**: `+'`'+`${getRole.members.size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
      message.channel.send(embed).then(msg => {

        message.guild.members.filter(m => m.roles.find(r => r.name.toLowerCase().includes(args[0])) || m.roles.find(r => r.id === args[0])).forEach(g => {

          g.send(args2).then(() => { //!Baron#0001

            successCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **${getRole} Memebrs**: `+'`'+`${getRole.members.size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          }).catch(e => {

            errorCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **${getRole} Memebrs**: `+'`'+`${getRole.members.size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          });

        });
      }) //!Baron#0001


    }
      if(args[0] === 'online'){
        if(!args[1]) return;
        if (cooldown.has(message.author.id)) {
          if(message.author.bot) return;
          return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
          message.delete(5000)
          })
          }
          cooldown.add(message.author.id);
          setTimeout(() => {
            cooldown.delete(message.author.id);

          }, 7200000);
      let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Online Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'online').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
      message.channel.send(embed).then(msg => {

        message.guild.members.filter(m => m.presence.status === 'dnd').forEach(g => {

          g.send(args2).then(() => {

            successCount++;

            msgCount++;
            let embed = new Discord.RichEmbed() //!Baron#0001
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Online Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'online').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          }).catch(e => {

            errorCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Online Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'online').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`) //!Baron#0001
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          });

        });
      })
      }
      if(args[0] === 'dnd'){
        if(!args[1]) return;
        if (cooldown.has(message.author.id)) {
          if(message.author.bot) return;
          return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
          message.delete(5000)
          })
          }
          cooldown.add(message.author.id); //!Baron#0001
          setTimeout(() => {
            cooldown.delete(message.author.id);

          }, 7200000);
      let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Dnd Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
      message.channel.send(embed).then(msg => { //!Baron#0001

        message.guild.members.filter(m => m.presence.status === 'dnd').forEach(g => {
 
          g.send(args2).then(() => {

            successCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Dnd Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          }).catch(e => {

            errorCount++; //!Baron#0001

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Dnd Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          });

        }); //!Baron#0001
      })
      }
      if(args[0] === 'idle'){
        if(!args[1]) return;
        if (cooldown.has(message.author.id)) {
          if(message.author.bot) return;
          return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
          message.delete(5000)
          })
          }
          cooldown.add(message.author.id); //!Baron#0001
          setTimeout(() => {
            cooldown.delete(message.author.id);

          }, 7200000);
      let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Idle Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL) //!Baron#0001
      message.channel.send(embed).then(msg => {

        message.guild.members.filter(m => m.presence.status === 'idle').forEach(g => {

          g.send(args2).then(() => {

            successCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Idle Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          }).catch(e => { //!Baron#0001

            errorCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Idle Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          });

        });
      })
      }
      if(args[0] === 'offline'){
        if(!args[1]) return;
        if (cooldown.has(message.author.id)) {
          if(message.author.bot) return;
          return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
          message.delete(5000)
          })
          }
          cooldown.add(message.author.id);
          setTimeout(() => {
            cooldown.delete(message.author.id); //!Baron#0001

          }, 7200000);
      let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Offline Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
      message.channel.send(embed).then(msg => {

        message.guild.members.filter(m => m.presence.status === 'offline').forEach(g => {

          g.send(args2).then(() => {

            successCount++;

            msgCount++;
            let embed = new Discord.RichEmbed() //!Baron#0001
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Offline Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          }).catch(e => {

            errorCount++;

            msgCount++;
            let embed = new Discord.RichEmbed()
            .setTitle(`**Brodcast Info**`)
            .setDescription(`- **Offline Memebrs**: `+'`'+`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`+'`\n'+
            `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
            `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
            `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
            .setFooter(client.user.username, client.user.avatarURL)
            msg.edit(embed);

          });

        });
      })
      }
      if(args[0] === 'all'){
        if(!args[1]) return;
          if (cooldown.has(message.author.id)) {
            if(message.author.bot) return;
            return message.reply("U have to wait 2 Hours for using this cmd again").then(message => {
            message.delete(5000)
            })
            } //!Baron#0001
            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);

            }, 7200000);
        let embed = new Discord.RichEmbed()
              .setTitle(`**Brodcast Info**`)
              .setDescription(`- **All Memebrs**: `+'`'+`${message.guild.memberCount}`+'`\n'+
              `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
              `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
              `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
              .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send(embed).then(msg => {

          message.guild.members.forEach(g => {

            g.send(args2).then(() => {

              successCount++; //!Baron#0001

              msgCount++;
              let embed = new Discord.RichEmbed()
              .setTitle(`**Brodcast Info**`)
              .setDescription(`- **All Memebrs**: `+'`'+`${message.guild.memberCount}`+'`\n'+
              `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
              `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
              `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
              .setFooter(client.user.username, client.user.avatarURL)
              msg.edit(embed);

            }).catch(e => {

              errorCount++;

              msgCount++;
              let embed = new Discord.RichEmbed()
              .setTitle(`**Brodcast Info**`)
              .setDescription(`- **All Memebrs**: `+'`'+`${message.guild.memberCount}`+'`\n'+
              `- Sent messages: `+'`'+`${msgCount}`+'`'+`${sent}\n`+
              `- Received messages: `+'`'+`${successCount}`+'`'+`${rcv}\n`+
              `- Non-received messages: `+'`'+`${errorCount}`+'`'+`${cant}`)
              .setFooter(client.user.username, client.user.avatarURL)
              msg.edit(embed);

            });

          });//!Baron#0001
        })
      }
      if(args[0] === 'help'){
        let space = '⚙️';
        let arrow = '📌';
        var online = '💚';
  var dnd = '❤️';
  var idle = '💛';
  var offline = '🖤';
       let embed = new Discord.RichEmbed()
       .setAuthor(message.author.username, message.author.avatarURL)
       .setTitle(`**IdiotBot Broadcast Help**`)
       .setDescription(`${space}**In fact idiot bot is designed to meet almost all the desires the server owner needs, So we tried to make it as much as possible**\n`+
       '**`Commands`**\n'+`${space} `+`**${prefix}bc all <message>**`+` ${arrow} For all members\n`+
       `${space} `+`**${prefix}bc online <message>**`+` ${arrow} For specific members with ${online} status\n`+
       `${space} `+`**${prefix}bc offline <message>**`+` ${arrow} For specific members with ${offline} status\n`+
       `${space} `+`**${prefix}bc idle <message>**`+` ${arrow} For specific members with ${idle} status\n`+
       `${space} `+`**${prefix}bc dnd <message>**`+` ${arrow} For specific members with ${dnd} status\n`+
       `${space} `+`**${prefix}bc role-name/role-id <message>**`+` ${arrow} For members with specific role\n`)
       .addField(`**Replacements**`, `**[sender]\n
       [server]\n
       [channel]\n
       [owner]**`, true)
       .addField(`**Replacements**`, `**[members]\n
       [roles]\n
       [online]\n
       [offline]**`, true)
       message.channel.send(embed)
      }
      break;  //!Baron#0001
    }
  })
client.login('NTk1NTgxMzQyNzg4MzU0MDU4.XpJL1Q.S7sinZ_XeX8s-dIYc4mOh7LnKnM');
