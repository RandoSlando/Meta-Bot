const Discord = require('discord.js');
const client = new Discord.Client();
var pre = 'm!'
//var onmsg = `| m!help | ${client.guilds.size} Servers |`
var startTime = Date.now();
client.on('ready', () => { //Tells when the bot is online
console.log('Loaded fully and connecting to servers '+ client.guilds.size + ' ' + client.user.username)
client.user.setGame(`| m!help | ${client.guilds.size} Servers |`);
client.user.setStatus('dnd')
})

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`| m!help | ${client.guilds.size} Servers |`);
    //client.guild.createRole('Bypass', '#8A4131')
    //client.guild.createRole('Users', '#8A4131')
  });


  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`| m!help | ${client.guilds.size} Servers |`);
  });


client.on('reconneting', () => { //Sends a log of reconnection
console.log('Reconnecting to servers ' + client.user.username)
})



client.on('guildMemberAdd', member => {
   
    var role = member.guild.roles.find('name', 'Users');
    member.addRole(role)
})



client.on('message', (message) => {

   if(message.author.bot) return;

           


    // Commands \|/ Logs \\
    //console.log('Server ' + guild.name)
    console.log('Message Recived, "' + message.content + '" (Sender is '+ message.author.username + ' with id of ' + message.author.id + ' in channel '+ message.channel.name + ')')
    if(message.content.startsWith(pre + 'help')) {
    message.delete(5000,1)
    //#db8da4
    //message.channel.sendMessage('Commands;')
    //message.channel.sendMessage('```'+ pre +'help, '+ pre + 'ping, '+ pre + 'myavatar, '+ pre +'uptime, '+pre+'suicide, '+ pre + 'moderation, '+ pre + 'avatar ```')
const embed = new Discord.RichEmbed()
    .setColor('0D98BA')
    .setTimestamp()
    .setTitle('Help ℹ️')
    .setDescription(`${pre}help **Shows all Commands**\n${pre}ping **Shows bot's ping / connectivity**\n${pre}myavatar **Displays your avatar link**\n${pre}uptime **Shows how long the bot has been online**\n${pre}avatar **To use this mention a user and it will display their avatar link (USER MUST BE IN SERVER / GUILD)**\n${pre}stab **Tag a user with this command to stab them**`)
    message.channel.send({embed})
    //client.author.message.delete(20000,1)
}
if(message.content.startsWith(pre+'moderation')) {
    message.author.sendMessage('Moderation Roles')
    message.author.sendMessage('```In order to make moderation work and bypass our filters you must have a rank named "Meta Permissions", and "Bypass" (Also for them to work you must have the role)```')
}
if (message.content.startsWith(pre + 'myavatar')) {
    message.delete(5000,1)
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }

  if(message.content.startsWith(pre+'avatar')) {
    let avatarUser = message.guild.member(message.mentions.users.first())
    if(!avatarUser) { 
        const embed = new Discord.RichEmbed()
        .setColor('CB4154')
        .setTimestamp()
        .setTitle('❌ Insufficient Arguments ❌')
        .setDescription(`No user mentioned!`)
        return message.channel.send({embed})
    }
    const embed = new Discord.RichEmbed()
    .setColor('CB4154')
    .setTimestamp()
    .setTitle('Okay here you go! :grinning:')
    .setDescription(` `)
    message.channel.send({embed}); message.channel.send(avatarUser.user.avatarURL)
  }


  if(message.content.startsWith(pre+'stab')) {
    let stabbedUser = message.guild.member(message.mentions.users.first())
    if(!stabbedUser) { return message.reply('Please mention a user to stab them!!')}
    if(stabbedUser.user.username == message.author.username) {
        const embed = new Discord.RichEmbed()
        .setColor('CB4154')
        .setTimestamp()
        .setTitle('❌ Nope! ❌')
        .setDescription(`You can't stab yourself!!`)
        message.channel.send({embed})
    } else {
    const embed = new Discord.RichEmbed()
    .setColor('CB4154')
    .setTimestamp()
    .setTitle(':scream: ! Stabbage ! :scream:')
    .setDescription(`🔪🔪  **${message.author.username}** has stabbed **${stabbedUser.user.username}**  🔪🔪`)
    message.channel.send({embed})
    }
    //message.channel.sendMessage('🔪🔪  :scream: :scream:  **' + message.author.username + '** has stabbed **' + stabbedUser.user.username + '**:scream: :scream:    🔪🔪')
  }

// if(message.content.startsWith(pre+ 'purge')) {
//    let messagecount = parseInt(args.join(' '));
 //   message.channel.fetchMessages({
 //     limit: messagecount
//    }).then(messages => message.channel.bulkDelete(messages));
// }
   
  //if(message.content.startsWith(pre+'info')) {
  //  let stabbedUser = message.guild.member(message.mentions.users.first())
  //  if(!stabbedUser) { return message.reply('Please mention a user to stab them!!')}
  //  message.channel.sendMessage('❌❌ ERROR 404 : 01010101 01101110 01100001 01100010 01101100 01100101 00100000 01110100 01101111 00100000 01100110 01101001 01101110 01100100 00100000 01110101 01110011 01100101 01110010 00100000 01100100 01100001 01110100 01100001 ❌❌')
  //}

  if(message.content.startsWith(pre+'info')) {
    let iUser = message.guild.member(message.mentions.users.first())
    if(!iUser) { return message.reply('Please mention a user to find their info!')}
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setTitle('Information 📓')
    .setDescription(`Name : ${iUser.user.username}\nID : ${iUser.user.id}\nLast Message ID : ${iUser.user.lastMessageID}\nPoints : **NULL**\n`)
    message.channel.send({embed})
}
  if(message.content.startsWith(pre + "say")) {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  if(message.content.startsWith(pre + 'uptime')) {
    message.delete(5000,1)
    var time = Date.now()
    var msec = time - startTime;
    var days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    var mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    var secs = Math.floor(msec / 1000);
    var timestr = "";
    if(days > 0) {
        timestr += days + " days ";
    }
    if(hours > 0) {
        timestr += hours + " hours ";
    }
    if(mins > 0) {
        timestr += mins + " minutes ";
    }
    if(secs > 0) {
        timestr += secs + " seconds ";
    }
    const embed = new Discord.RichEmbed()
    .setColor('0D98BA')
    .setTimestamp()
    .setTitle('Uptime ⏲️')
    .setDescription(`*Bot has been online for ${timestr} :open_mouth:*`)
    message.channel.send({embed})
  }

  if(message.content.startsWith(pre + 'time')) {
    var time = Date.now()

    var years = Math.floor(time / 1000 / 60 / 60 / 24 / 365);
    time -= years * 1000 * 60 * 60 * 24 *365;
    var days = Math.floor(time / 1000 / 60 / 60 / 24);
    time -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(time / 1000 / 60 / 60);
    time -= hours * 1000 * 60 * 60;
    var mins = Math.floor(time / 1000 / 60);
    time -= mins * 1000 * 60;
    var secs = Math.floor(time / 1000);
    var timestr = "";
    if(years > 0) {
        timestr += years + " years ";
    }
    if(days > 0) {
        timestr += days + " days ";
    }
    if(hours > 0) {
        timestr += hours + " hours ";
    }
    if(mins > 0) {
        timestr += mins + " minutes ";
    }
    if(secs > 0) {
        timestr += secs + " seconds ";
    }
    message.reply(timestr)
  }
if(message.content.startsWith(pre + 'ping')) {
    message.delete(5000,1)
  //message.channel.sendMessage('Pong! ' + `${Date.now() - client.ping}` + ' ms');
  const embed = new Discord.RichEmbed()
  .setColor('0D98BA')
  .setTimestamp()
  .setTitle('Ping 🕦')
  .setDescription(`Pong! *Bot took ${client.ping} ms to respond!*`)
  message.channel.send({embed})
}

if(message.content.startsWith(pre + 'embedded')) {
    message.delete(5000,1)
    new Discord.RichEmbed('test');
}
if(message.content.startsWith(pre + 'suicide')) {
    message.delete(5000,1)
    message.reply(':dagger:  :gun: ')
}
if(message.content.startsWith(pre + 'kick')) {
    let UsageRole = message.guild.roles.find("name", "Meta Permissions");
    if(!UsageRole) {
        return message.reply('Please make a role named "Meta Permissions"!!')
    }
    if(message.author.id == '123960886044917762') {
        if(message.mentions.users.size === 0) {
            return message.reply('Invalid arguments')
        }
            let kickMember = message.guild.member(message.mentions.users.first())
            if(!kickMember) {
            return message.reply('Invalid user')
        }
        return;
    }
    if(!message.member.roles.has(UsageRole.id)) {
        return message.reply('Invalid Permissions')
    }
        if(message.mentions.users.size === 0) {
            return message.reply('Invalid arguments')
        }
            let kickMember = message.guild.member(message.mentions.users.first())
            if(!kickMember) {
            return message.reply('Invalid user')
        } 
    

}

if(message.content.startsWith(pre + 'ban')) {
    let UsageRole = message.guild.roles.find("name", "Meta Permissions");
    if(!UsageRole) {
        return message.reply('Please make a role named "Meta Permissions"!!')
    }
    if(message.author.id == '123960886044917762') {
        if(message.mentions.users.size === 0) {
            return message.reply('Invalid arguments')
        }
            let banMember = message.guild.member(message.mentions.users.first())
            if(!banMember) {
            return message.reply('Invalid user')
        }
        return;
    }
    if(!message.member.roles.has(UsageRole.id)) {
        return message.reply('Invalid Permissions')
    }
        if(message.mentions.users.size === 0) {
            return message.reply('Invalid arguments')
        }
            let banMember = message.guild.member(message.mentions.users.first())
            if(!banMember) {
            return message.reply('Invalid user')
        } 
        if(!message.member.roles.has(UsageRole.id)) {
            return message.reply('Invalid Permissions')
        }
	

}


if(message.content.startsWith('Help me!')) {
    message.delete(5000,1)
    message.channel.sendMessage('WEEE WOOO Help is on the way!')
    //client.message.delete(20000,1)
}

})

client.on('message', (message) => {
    if(message.author.id == '123960886044917762') {
        if(message.content == pre + 'status 0') {
            message.delete(1,1)
            client.user.setStatus('invisible')
        }
if(message.content == pre + 'status 1') {
    message.delete(1,1)
            client.user.setStatus('dnd')
}
if(message.content == pre + 'status 2') {
    message.delete(1,1)
            client.user.setStatus('idle')

}
if(message.content == pre + 'status 3') {
    message.delete(1,1)
            client.user.setStatus('online')
}

    } else return;
    

})

client.on('message', (message) => {
    // Vulgar Language
if(message.content.includes('fuck')) { 
    let modRole = message.guild.roles.find("name", "Bypass");
    if(message.author.id == '123960886044917762') {
        message.reply(`Owner Force Bypass Filter`);
        return;
    }
    if(message.member.roles.has(modRole.id)) {
        message.channel.sendMessage(`Bypassed Filter`)
        return;
    } else; {
    message.delete(1,1)
    message.reply('PLEASE Dont use that language!!!!')
    message.channel.sendMessage('If you are the owner either create a rank called "Bypass" or keep the errors')
    }
}
if(message.content.includes('bitch')) { 
    let modRole = message.guild.roles.find("name", "Bypass");
    if(message.author.id == '123960886044917762') {
        message.reply(`Owner Force Bypass Filter`);
        return;
    }
    if(message.member.roles.has(modRole.id)) {
        message.channel.sendMessage(`Bypassed Filter`)
        return;
    } else; {
    message.delete(1,1)
    message.reply('PLEASE Dont use that language!!!!')
    message.channel.sendMessage('If you are the owner either create a rank called "Bypass" or keep the errors')
    }
}
})

client.on('message', (message) => {
    if(message.author.bot) {
        return;
    }
     //Link Blockage
    
     //if(message.author.id == '215689512058224640') { return; }
    // if(message.author.id == '123960886044917762') { return; }
if(message.content.includes('.com')) { //.com blockage
    let Modbypass = message.guild.roles.find("name", "Bypass");
    if(!Modbypass) {
        return message.reply('Please make a role named "Bypass"!!')
    }
    if(message.author.id == '123960886044917762') {
        message.reply(`Owner Force Bypass Filter`);
        return;
    }
    if(message.member.roles.has(Modbypass.id)) {
        message.reply(`Bypassed Filter`);
        return;
    } else; {
        message.delete(1,1); 
        message.channel.sendMessage('Please don\'t post links!');
        message.channel.sendMessage('If you are the owner of this server either create a rank called "Bypass" and give yourself it or keep the errors')
    }
    
}
if(message.content.includes('.net')) { //.net blockage
    let Modbypass = message.guild.roles.find("name", "Bypass");
    if(!Modbypass) {
        return message.reply('Please make a role named "Bypass"!!')
    }
    if(message.author.id == '123960886044917762') {
        message.reply(`Owner Force Bypass Filter`);
        return;
    }
    if(message.member.roles.has(Modbypass.id)) {
        message.reply(`Bypassed Filter`);
        return;
    } else; {
        message.delete(1,1); 
        message.channel.sendMessage('Please don\'t post links!');
        message.channel.sendMessage('If you are the owner of this server either create a rank called "Bypass" and give yourself it or keep the errors')
    }
    
}
if(message.content.includes('.org')) { //.org blockage
    let Modbypass = message.guild.roles.find("name", "Bypass");
    if(!Modbypass) {
        return message.reply('Please make a role named "Bypass"!!')
    }
    if(message.author.id == '123960886044917762') {
        message.reply(`Owner Force Bypass Filter`);
        return;
    }
    if(message.member.roles.has(Modbypass.id)) {
        message.reply(`Bypassed Filter`);
        return;
    } else; {
        message.delete(1,1); 
        message.channel.sendMessage('Please don\'t post links!');
        message.channel.sendMessage('If you are the owner of this server either create a rank called "Bypass" and give yourself it or keep the errors')
    }
}
})









//client.on('roleCreate', role => {
    //let guild = role.guild
    //guild.defaultChannel.sendMessage('New role "'+ role.name + '"')
    //console.log('New role called ' + role.name + ' in guild ' + guild.name)
//})
client.login('process.env.TOKEN'); // BOT
