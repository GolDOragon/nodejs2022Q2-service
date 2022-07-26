FROM node:16.16.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run lint

CMD npm run dev:container
