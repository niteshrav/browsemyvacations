# Production API image — build from repo root:
# docker build -f backend/Dockerfile -t bmv-api .

FROM node:20-alpine AS base
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
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @bmv/shared build \
  && pnpm --filter @bmv/database generate \
  && pnpm --filter @bmv/database build \
  && pnpm --filter backend build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs
COPY --from=build --chown=nestjs:nodejs /app/backend/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/backend/package.json ./
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/database ./database
COPY --from=build --chown=nestjs:nodejs /app/shared ./shared
ENV PORT=3001
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/v1/health || exit 1
CMD ["node", "dist/main.js"]
