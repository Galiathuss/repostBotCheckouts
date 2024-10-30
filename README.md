# repostBotCheckouts

打包镜像
docker build -t my-discord-bot .

运行容器

docker run -d --name discord-bot my-discord-bot

列出所有镜像
docker images -a

查看运行中的容器


不要改变discord.js的版本，新的discord api将不再支持账号token登录