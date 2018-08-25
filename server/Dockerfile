FROM node:alpine

WORKDIR /usr/app

RUN npm install nodemon -g

COPY package*.json ./
RUN npm install

COPY . .
