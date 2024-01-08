FROM node:20.1 AS base

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY ./prisma/ .

ENTRYPOINT [ "npx", "--no-install", "prisma", "migrate", "deploy"]
