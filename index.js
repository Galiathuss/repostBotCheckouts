const { Client, WebhookClient } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client();
const prefix = '!';

// 全局未捕获异常处理
process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
});

// Promise 异常处理
process.on('unhandledRejection', (error) => {
    console.error('未处理的 Promise 拒绝:', error);
});

// 安全地读取文件
let hookAndIds = [];
try {
    const fileContent = fs.readFileSync('hookandid.txt', 'utf-8');
    hookAndIds = fileContent.split('\n').map(line => {
        try {
            const [id, webhookUrl, tab] = line.split(' ');
            const [,, , , , webhookId, webhookToken] = webhookUrl.split('/');
            return { 
                id, 
                webhookClient: new WebhookClient(webhookId, webhookToken) 
            };
        } catch (err) {
            console.error('解析 webhook 配置失败:', err);
            return null;
        }
    }).filter(item => item !== null); // 过滤掉解析失败的项
} catch (err) {
    console.error('读取 hookandid.txt 文件失败:', err);
}

// Discord 客户端事件处理
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is ready`);
});

client.on('error', error => {
    console.error('Discord 客户端错误:', error);
});

client.on('disconnect', () => {
    console.log('Bot 断开连接');
});

client.on('reconnecting', () => {
    console.log('Bot 正在重新连接');
});

client.on('message', async message => {
    try {
        for (const { id, webhookClient } of hookAndIds) {
            if (message.channel.id !== id) continue;

            console.log(`转发来自频道的消息: ${id}`);

            // 处理文本消息
            if (message.content) {
                try {
                    await webhookClient.send(message.content);
                } catch (err) {
                    console.error(`转发文本消息失败 (频道 ${id}):`, err);
                    continue; // 继续处理下一个消息
                }
            }

            // 处理嵌入消息
            if (message.embeds && message.embeds.length > 0) {
                for (const embed of message.embeds) {
                    try {
                        embed.color = 1488566;
                        if (embed.footer) {
                            embed.footer.text = "testfooter";
                            embed.footer.iconURL = "https://cdn.discordapp.com/emojis/587287849016098872.png?v=1";
                        }
                        await webhookClient.send({ 
                            content: 'New roblox game was posted.', 
                            embeds: [embed] 
                        });
                    } catch (err) {
                        console.error(`转发嵌入消息失败 (频道 ${id}):`, err);
                        continue; // 继续处理下一个嵌入消息
                    }
                }
            }
        }
    } catch (err) {
        console.error('处理消息时发生错误:', err);
    }
});

// 安全的登录处理
const startBot = async () => {
    try {
        await client.login(config.token);
    } catch (err) {
        console.error('登录失败:', err);
        // 可以在这里添加重试逻辑
        setTimeout(startBot, 5000); // 5秒后重试
    }
};

startBot();