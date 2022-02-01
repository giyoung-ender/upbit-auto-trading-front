FROM node:16.13.2 as builder
MAINTAINER G0Yang<ender35841@gmail.com>

WORKDIR /project/upbitAutoTading

COPY ./ /project/upbitAutoTading

RUN npm install && npm run build


FROM node:16.13.2

RUN npm install -g serve

WORKDIR /project/upbitAutoTading

COPY --from=builder /project/upbitAutoTading/build ./build/

EXPOSE 3000
CMD [ "serve", "-s", "build"]
