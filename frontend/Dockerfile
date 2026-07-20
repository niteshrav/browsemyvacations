# Production web image — build from repo root:
# docker build -f frontend/Dockerfile -t bmv-web .

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
ENV CI=true

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY database/package.json ./database/
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY shared ./shared
COPY frontend ./frontend

ARG NEXT_PUBLIC_SITE_URL=https://browsemyvacation.cloud.dcdeploy.cloud
ARG NEXT_PUBLIC_API_URL=https://browsemyvacation.cloud.dcdeploy.cloud/api/v1
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter @bmv/shared build \
  && pnpm --filter frontend build

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public

WORKDIR /app/frontend
EXPOSE 3000
CMD ["node", "server.js"]
