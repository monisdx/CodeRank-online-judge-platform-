FROM node:21-alpine

WORKDIR /app

RUN apk update && apk add --no-cache g++

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 9090

CMD ["yarn", "dev"]