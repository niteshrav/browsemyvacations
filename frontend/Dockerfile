# Production web image — build from repo root:
# docker build -f frontend/Dockerfile -t bmv-web .

FROM node:22-bookworm-slim AS builder
WORKDIR /app

ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.0 --activate

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
  && pnpm --filter frontend exec next build

FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Monorepo tracing root nests standalone under frontend/ (server.js + static/public).
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static

EXPOSE 3000
CMD ["node", "frontend/server.js"]
