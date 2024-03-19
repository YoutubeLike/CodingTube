FROM node:20-alpine

RUN apk update && apk add ffmpeg
WORKDIR /app/back
COPY package.json /app/back/package.json

RUN npm install