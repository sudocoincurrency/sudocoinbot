const Discord = require('discord.js');
const fetch = require('node-fetch');

const bot = new Discord.Client();
bot.login('');

bot.on('ready', () => {
    console.log('online');
});

bot.on('message', message => {

    let messageArray = message.content.split(' ');
    let args = messageArray.slice(1);
    let cmd = messageArray[0];
    let prefix = '.';

    let endpoint = `https://coin.sudocode1.xyz/api/v1/`;

    if (cmd == `${prefix}user`) {

        if (!args[0]) return message.channel.send('you must provide an id');

        fetch(`${endpoint}getUser?${args[0]}`)
        .then(res => res.text())
        .then(body => {
            if (body.includes('-1')) return message.channel.send('invalid id');

            body = body.split(',');

            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#4772ff')
                .addField('User ID', body[0])
                .addField('Coin', body[1])
            )
        });
    }

    if (cmd == `${prefix}item`) {
        if (!args[0]) return message.channel.send('you must provide an id');

        fetch(`${endpoint}getStoreItem?${args[0]}`)
        .then(res => res.text())
        .then(body => {
            if (body.includes('-1')) return message.channel.send('invalid id');

            body = body.split(',');

            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#4772ff')
                .addField('Item Name', body[0])
                .addField('Price', body[1])
                .addField('Seller ID', body[2])
                .addField('Stock', body[3])
                .addField('Item ID', body[4])
                .addField('Category', body[5])
                .addField('Seller Contact', body[6])
            )
        });
    }

    if (cmd == `${prefix}transaction`) {
        if (!args[0]) return message.channel.send('you must provide an id');

        fetch(`${endpoint}getTransaction?${args[0]}`)
        .then(res => res.text())
        .then(body => {
            if (body.includes('-1')) return message.channel.send('invalid id');

            body = body.split(',');

            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#4772ff')
                .addField('Transaction ID', body[3])
                .addField('Sending User ID', body[0])
                .addField('Recieving User ID', body[1])
                .addField('Amount Sent', body[2])
                .addField('Reason', body[4])
            )
        });
    }

    if (cmd == `${prefix}docs`) {
       


        let endpoints = {
            'Primary#getStatistics': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getStatistics.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET')
                    .addField('Endpoint', '/api/v1/getStatistics.php')
                    .addField('Return', '`configId|coinsMined|coinCap|richestUser|richestUsersCoinCount|userCount`')
                )
            },

            'Primary#getStatistic': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getStatistic.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET WITH QUERY')
                    .addField('Endpoint', '/api/v1/getStatistic.php?statistic')
                    .addField('Return', 'the statistic you requested')
                )
            },

            'Primary#getStoreItems': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getStoreItems.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET')
                    .addField('Endpoint', '/api/v1/getStoreItems.php')
                    .addField('Return', '`itemName,amountToCharge,sellerId,stock,itemId,category,contactSeller,descr|someOtheriItemName,` and so on.')
                )
            },

            'Primary#getStoreItem': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getStoreItem.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET WITH QUERY')
                    .addField('Endpoint', '/api/v1/getStoreItem.php?id')
                    .addField('Return', '`itemName,amountToCharge,sellerId,stock,itemId,category,contactSeller,descr`')
                )
            },

            'Primary#getTransactions': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getTransactions.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET')
                    .addField('Endpoint', '/api/v1/getTransactions.php')
                    .addField('Return', '`sendingUserId,recievingUserId,amountTransferred,transactionId,reason|someSendingUserId,` and so on.')
                )
            },

            'Primary#getTransaction': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getTransaction.php?id')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET WITH QUERY')
                    .addField('Endpoint', '/api/v1/getTransaction.php')
                    .addField('Return', '`sendingUserId,recievingUserId,amountTransferred,transactionId,reason`')
                )
            },

            'Primary#getUsers': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getUsers.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET')
                    .addField('Endpoint', '/api/v1/getUsers.php')
                    .addField('Return', '`userId,coins|someOtherUserId,` and so on.')
                )
            },

            'Primary#getUser': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('getUser.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET WITH QUERY')
                    .addField('Endpoint', '/api/v1/getUser.php?id')
                    .addField('Return', '`userId,coins`')
                )
            },

            'Primary#createitem': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('createitem.php')
                    .setColor('#0062ff')
                    .addField('Type', 'POST')
                    .addField('Endpoint', '/createitem.php')
                    .addField('Return', 'html page data')
                    .addField('Parameters', '`itemName (string)\namountToChange (float)\nstock (int)\ncontactSeller (string)\ndescr (string)\ncategory (string)\npassword (string)`')
                )
            },

            'Primary#manageitem': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('manageitem.php')
                    .setColor('#0062ff')
                    .addField('Type', 'POST')
                    .addField('Endpoint', '/manageitem.php')
                    .addField('Return', 'html page data')
                    .addField('Parameters', '`itemName (string)\namountToChange (float)\nstock (int)\ncontactSeller (string)\ndescr (string)\ncategory (string)\npassword (string)`')
                )
            },

            'Primary#checkId': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('checkId.php')
                    .setColor('#0062ff')
                    .addField('Type', 'POST')
                    .addField('Endpoint', '/api/v1/checkId.php')
                    .addField('Return', 'your id')
                    .addField('Parameters', '`password (string)`')
                )
            },

            'Primary#apiSignUp': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('apiSignUp.php')
                    .setColor('#00ff5e')
                    .addField('Type', 'GET')
                    .addField('Endpoint', '/api/v1/apiSignUp.php')
                    .addField('Return', 'id|password')
                )
            },

            'WebSocket#Auth': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('Authentication')
                    .setColor('#fc8403')
                    .addField('JSON to send', '`[\'auth\', { password: \'passwordInBase64Here\' }]`')
                    .addField('Return', '`[ \'success\' ]`')
                    
                )
            },

            'WebSocket#Mining': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('Mining')
                    .setColor('#fc8403')
                    .addField('JSON to send', '`[ \'mine\' ]`')
                    .addField('Return', '`[ \'balUpdate\', { newBal } ]`')
                    
                )
            },

            'WebSocket#Transfer': () => {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('Mining')
                    .setColor('#fc8403')
                    .addField('JSON to send', '`[\'transfer\', { amount: amountToSend, to: userToSendTo }]`')
                    .addField('Return', '`none`')
                    
                )
            },
        }


        if (args[0] && args[0].toLowerCase() == 'primary') {
            let list = '';
            Object.entries(endpoints).forEach(x => {
                if (x[0].includes('WebSocket')) return;
                list += `\`${x[0]}\`\n`;
            });

            return message.channel.send(
                new Discord.MessageEmbed()
                .addField('Docs', list)
                .addField('Docs Link', '[Primary API Docs](https://coin.sudocode1.xyz/api)')
                .addField('Endpoint', 'https://coin.sudocode1.xyz/api')
                .setColor('#4772ff')
            );

        } else if (args[0] && (args[0].toLowerCase() == 'websocket' || args[0].toLowerCase() == 'ws')) {
            let list = '';
            Object.entries(endpoints).forEach(x => {
                if (x[0].includes('Primary')) return;
                list += `\`${x[0]}\`\n`;
            });

            return message.channel.send(
                new Discord.MessageEmbed()
                .addField('Docs', list)
                .addField('Docs Link', '[WebSocket Docs](https://coin.sudocode1.xyz/api)')
                .addField('Endpoint', 'ws://188.165.82.203:90')
                .setColor('#4772ff')
            );
        }

        if (!args[0] || !endpoints[args[0]]) {
            message.channel.send(
                new Discord.MessageEmbed()
                .addField('Documentation Lists', '`Primary`, `WebSocket` (alias ws)')
                .setColor('#4772ff')
            )
        }
        else endpoints[args[0]]();

    }

    if (cmd == `${prefix}stats`) {
        fetch(`${endpoint}getStatistics`)
        .then(res => res.text())
        .then(body => {
            if (body.includes('-1')) return message.channel.send('invalid id');

            body = body.split('|').slice(1);

            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('Statistics')
                .setColor('#4772ff')
                .addField('Coins Mined', body[0], true)
                .addField('Coin Cap', body[1], true)
                .addField('Coins remaining', body[1] - body[0], true)
                .addField('Percentage Mined', ((body[0] / body[1]) * 100) + '%', true)
                .addField('Richest User', body[2], true)
                .addField('Richest User\'s Coin', body[2], true)
                
            )
        });
    }

    if (cmd == `${prefix}help`) {
        message.channel.send(
            new Discord.MessageEmbed()
            .addField('Command List', '`help`\n`docs <type/doc>`\n`stats`\n`user <id>`\n`item <id>`\n`transaction <id>`\n`fetch <endpoint>`')
            .setColor('#4772ff')
            
        )
    }

    if (cmd == `${prefix}fetch`) {
        fetch(`${endpoint}/${args[0]}`)
        .then(res => res.text())
        .then(body => message.channel.send(`\`\`\`html\n${body}\`\`\``))
        .catch(e => message.channel.send('error'))
    }
});
