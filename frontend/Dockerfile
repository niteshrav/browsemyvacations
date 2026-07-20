# Production web image — build from repo root:
# docker build -f frontend/Dockerfile -t bmv-web .

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.0 --activate

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://browsemyvacation.cloud.dcdeploy.cloud
ARG NEXT_PUBLIC_API_URL=https://browsemyvacation.cloud.dcdeploy.cloud/api/v1
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm install --ignore-scripts \
  && pnpm --filter @bmv/shared build \
  && pnpm --filter frontend build \
  && test -f frontend/.next/standalone/frontend/server.js

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "frontend/server.js"]
