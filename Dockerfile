FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY --from=runner /app/.next/static ./.next/static
COPY --from=runner /app/.next/standalone ./
COPY --from=runner /app/public ./public

EXPOSE 3000
CMD ["node","server.js"]