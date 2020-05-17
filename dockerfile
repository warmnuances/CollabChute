FROM node:current-slim
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/utils/comrs-8d4974d0386b.json" NODE_ENV=prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install
COPY . .
EXPOSE 5000
CMD ["node","server.js"]