FROM node:16.13.2
MAINTAINER G0Yang<ender35841@gmail.com>

RUN apt-get update -y && apt-get install git nano vim tzdata -y

WORKDIR /project/upbitAutoTading

COPY ./ /project/upbitAutoTading

RUN npm install -g pm2 node-gyp
RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 80 443 8080
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]