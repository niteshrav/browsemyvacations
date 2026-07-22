# Production API image — build from repo root:
# docker build -f backend/Dockerfile -t bmv-api .

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.13.0 --activate
ENV CI=true
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY shared/package.json ./shared/
COPY database/package.json ./database/
COPY backend/package.json ./backend/
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build
# Copy sources first, then overlay pnpm node_modules (source COPY would wipe them).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY shared ./shared
COPY database ./database
COPY backend ./backend
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/shared/node_modules ./shared/node_modules
COPY --from=deps /app/database/node_modules ./database/node_modules
RUN pnpm --filter @bmv/shared build \
  && pnpm --filter @bmv/database generate \
  && pnpm --filter @bmv/database build \
  && pnpm --filter backend build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache wget \
  && addgroup -g 1001 -S nodejs \
  && adduser -S nestjs -u 1001

# Keep monorepo layout so backend/node_modules → ../../../node_modules/.pnpm resolves.
COPY --from=build --chown=nestjs:nodejs /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/shared ./shared
COPY --from=build --chown=nestjs:nodejs /app/database ./database
COPY --from=build --chown=nestjs:nodejs /app/backend ./backend

USER nestjs
WORKDIR /app/backend
ENV PORT=3001
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/v1/health || exit 1
CMD ["node", "dist/main.js"]
