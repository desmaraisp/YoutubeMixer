FROM node:20.1-alpine AS base
ARG SENTRY_DSN
ARG SENTRY_ORG
ARG SENTRY_PROJECT

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json*  ./
RUN npm ci


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm run build
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV SENTRY_DSN SENTRY_DSN
ENV SENTRY_ORG SENTRY_ORG
ENV SENTRY_PROJECT SENTRY_PROJECT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]