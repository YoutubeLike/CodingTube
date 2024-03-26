FROM node:20-alpine
WORKDIR /app/live
COPY package.json /app/live/package.json
RUN apk update && apk add ffmpeg
RUN npm install