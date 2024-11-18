# repostBotCheckouts

打包镜像
docker build -t my-discord-bot .

运行容器

docker run -d --name discord-bot my-discord-bot

## 不要改变discord.js的版本，新的discord api将不再支持账号token登录

## 镜像操作

* **查看镜像列表:** `docker images`  列出本地已有的镜像。
* **搜索镜像:** `docker search <image_name>`  在 Docker Hub 上搜索镜像。 例如，`docker search ubuntu` 会搜索 Ubuntu 镜像。
* **拉取镜像:** `docker pull <image_name>` 从 Docker Hub 下载镜像到本地。 例如，`docker pull ubuntu:latest` 会下载最新版本的 Ubuntu 镜像。
* **删除镜像:** `docker rmi <image_id>` 或 `docker rmi <image_name>` 删除本地镜像。可以使用镜像 ID 或名称。  例如，`docker rmi ubuntu:latest` 会删除名为 `ubuntu:latest` 的镜像。
* **构建镜像:** `docker build -t <image_name> <path_to_Dockerfile>`  根据 Dockerfile 构建镜像。`<path_to_Dockerfile>` 指 Dockerfile 所在的目录路径。
* **查看镜像历史:** `docker image history <image_name>` 显示镜像的构建历史，包括每一层的指令和大小。
* **保存镜像:** `docker save <image_name> -o <filename.tar>` 将镜像保存为 tar 文件。
* **加载镜像:** `docker load -i <filename.tar>` 从 tar 文件加载镜像。
* **标记镜像:** `docker tag <image_id> <new_image_name>` 为镜像添加新的标签。
* **查看镜像详细信息:** `docker inspect <image_id>` 或 `docker inspect <image_name>`  显示镜像的详细信息，例如配置、层级结构等。

## 容器操作

* **创建并运行容器:** `docker run <image_name>`  创建并运行一个新的容器。 例如，`docker run -d -p 80:80 nginx:latest` 会在后台运行一个 Nginx 容器，并将容器的 80 端口映射到主机的 80 端口。
* **查看容器列表:** `docker ps -a`  列出所有容器，包括已停止的容器。 使用 `docker ps` 只列出正在运行的容器。
* **启动容器:** `docker start <container_id>` 或 `docker start <container_name>` 启动已停止的容器。
* **停止容器:** `docker stop <container_id>` 或 `docker stop <container_name>` 停止正在运行的容器。
* **重启容器:** `docker restart <container_id>` 或 `docker restart <container_name>` 重启容器。
* **删除容器:** `docker rm <container_id>` 或 `docker rm <container_name>` 删除容器。
* **进入容器:** `docker exec -it <container_id> bash`  进入正在运行的容器。
* **查看容器日志:** `docker logs <container_id>` 或 `docker logs <container_name>` 查看容器的日志输出。
* **查看容器详细信息:** `docker inspect <container_id>` 或 `docker inspect <container_name>` 显示容器的详细信息，例如配置、网络信息等。
