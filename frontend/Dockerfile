# Production web image — build from repo root:
# docker build -f frontend/Dockerfile -t bmv-web .

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++
RUN npm install -g pnpm@9.15.0
ENV CI=true
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY database/package.json ./database/
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/
RUN pnpm install --no-frozen-lockfile --ignore-scripts

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=deps /app/shared/node_modules ./shared/node_modules 2>/dev/null || true
COPY . .

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
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=build --chown=root:root /app/frontend/.next ./frontend/.next
COPY --from=build --chown=root:root /app/frontend/public ./frontend/public
COPY --from=build --chown=root:root /app/frontend/package.json ./frontend/package.json
COPY --from=build --chown=root:root /app/node_modules ./node_modules
COPY --from=build --chown=root:root /app/shared ./shared
WORKDIR /app/frontend
EXPOSE 3000
CMD ["node", "../node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
