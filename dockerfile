FROM node:current-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install
COPY . .
EXPOSE 5000
CMD ["node","server.js"]