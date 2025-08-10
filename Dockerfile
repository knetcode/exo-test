FROM node:22-alpine AS base

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .

RUN corepack enable pnpm && pnpm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]