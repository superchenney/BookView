FROM keymetrics/pm2-docker-alpine:7

MAINTAINER superchenney@outlook.com

# 安装依赖
# RUN apk add --update \
#     git

# 修改时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime



# RUN apt-get update
# # 修改时区
# RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# # 安装依赖
# RUN apt-get install -y \
#   python \
#   curl \
#   build-essential

# 安装 Node.js v7.x.x LTS
# curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
# sudo apt-get install -y nodejs




RUN mkdir -p /var/app

WORKDIR /var/app

COPY . /var/app

#RUN npm install --registry=https://registry.npm.taobao.org

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --only=production

ENV NODE_ENV=production

ENV PORT 8000
EXPOSE  8000


#CMD ["npm", "start"]  

CMD ["pm2-docker", "start", "--auto-exit", "ecosystem.config.js","--env", "production"]

