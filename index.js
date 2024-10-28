const { Client, WebhookClient } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client();
const prefix = '!';

client.on('ready', () => {
    console.log(`${client.user.id} is ready`);
});

const hookAndIds = fs.readFileSync('hookandid.txt', 'utf-8').split('\n').map(line => {
    const [id, webhookUrl, tab] = line.split(' ');
    const [,, , , , webhookId, webhookToken] = webhookUrl.split('/');
    console.log(`Loaded webhook for channel ID: ${id}, Webhook ID: ${webhookId}, Webhook Token: ${webhookToken}`);
    return { id, webhookClient: new WebhookClient(webhookId, webhookToken) };
});

client.on('message', message => {
    console.log(`Received message: ${message.content} from ${message.channel.id}`);

    // 不再排除机器人自己的消息
    // if (message.author.id === client.user.id) return;

    hookAndIds.forEach(({ id, webhookClient }) => {
        if (message.channel.id !== id) return;

        console.log(`Message from tracked channel: ${id}`);

        if (message.content) {
            console.log("Non-embed message, sending to webhook...");
            webhookClient.send(message.content)
                .then(() => console.log("Non-embed message sent to webhook"))
                .catch(err => console.error("Error sending non-embed message to webhook:", err));
        }

        if (message.embeds.length > 0) {
            console.log("Embed message detected, sending to webhook...");
            message.embeds.forEach(embed => {
                console.log("Processing embed:", embed);
                embed.color = 1488566;
                if (embed.footer) {
                    embed.footer.text = "testfooter";
                    embed.footer.iconURL = "https://cdn.discordapp.com/emojis/587287849016098872.png?v=1";
                }
                webhookClient.send({ content: 'New roblox game was posted.', embeds: [embed] })
                    .then(() => console.log("Embed message sent to webhook"))
                    .catch(err => console.error("Error sending embed message to webhook:", err));
            });
        }
    });
});

client.login(config.token).catch(console.error);
