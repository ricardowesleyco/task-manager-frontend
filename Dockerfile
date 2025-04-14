# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Copia o .env.local para ser usado em tempo de build (caso necessário)
COPY .env.local .env.local

RUN yarn build

# Etapa 2: execução
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]
