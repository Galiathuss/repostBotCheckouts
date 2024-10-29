const { Client, WebhookClient } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client();
const prefix = '!';

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is ready`);
});

const hookAndIds = fs.readFileSync('hookandid.txt', 'utf-8').split('\n').map(line => {
    const [id, webhookUrl, tab] = line.split(' ');
    const [,, , , , webhookId, webhookToken] = webhookUrl.split('/');
    return { id, webhookClient: new WebhookClient(webhookId, webhookToken) };
});

client.on('message', message => {
    hookAndIds.forEach(({ id, webhookClient }) => {
        if (message.channel.id !== id) return;

        console.log(`Forwarding message from channel: ${id}`);

        if (message.content) {
            webhookClient.send(message.content)
                .catch(err => console.error(`Error forwarding message from channel ${id}:`, err));
        }

        if (message.embeds.length > 0) {
            message.embeds.forEach(embed => {
                embed.color = 1488566;
                if (embed.footer) {
                    embed.footer.text = "testfooter";
                    embed.footer.iconURL = "https://cdn.discordapp.com/emojis/587287849016098872.png?v=1";
                }
                webhookClient.send({ content: 'New roblox game was posted.', embeds: [embed] })
                    .catch(err => console.error(`Error forwarding embed from channel ${id}:`, err));
            });
        }
    });
});

client.login(config.token).catch(err => console.error('Failed to login:', err));