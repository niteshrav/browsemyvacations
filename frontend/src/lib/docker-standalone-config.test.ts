import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("DCDeploy Dockerfile standalone layout", () => {
  it("starts Next.js standalone with the correct server.js path", () => {
    const dockerfilePath = path.resolve(__dirname, "../../Dockerfile");
    const dockerfile = readFileSync(dockerfilePath, "utf8");

    // outputFileTracingRoot is the monorepo root, so standalone nests under frontend/.
    expect(dockerfile).toContain("FROM node:22-bookworm-slim AS builder");
    expect(dockerfile).toContain("FROM node:22-bookworm-slim AS runner");
    expect(dockerfile).toContain('COPY --from=builder /app/frontend/public ./frontend/public');
    expect(dockerfile).toContain(
      "COPY --from=builder /app/frontend/.next/static ./frontend/.next/static",
    );
    expect(dockerfile).toContain('CMD ["node", "frontend/server.js"]');
  });

  it("builds the backend with a Node 22 base and correct healthcheck", () => {
    const backendDockerfilePath = path.resolve(__dirname, "../../../backend/Dockerfile");
    const backendDockerfile = readFileSync(backendDockerfilePath, "utf8");

    expect(backendDockerfile).toContain("FROM node:22-alpine AS base");
    expect(backendDockerfile).toContain("FROM node:22-alpine AS runner");
    expect(backendDockerfile).toContain("http://localhost:3001/api/v1/health");
    expect(backendDockerfile).toContain('CMD ["node", "dist/main.js"]');
  });

  it("runs the API from the monorepo backend path so pnpm workspace deps resolve", () => {
    const backendDockerfilePath = path.resolve(__dirname, "../../../backend/Dockerfile");
    const backendDockerfile = readFileSync(backendDockerfilePath, "utf8");

    // Root-only node_modules copy breaks Nest resolution (@nestjs/common MODULE_NOT_FOUND).
    expect(backendDockerfile).toContain("WORKDIR /app/backend");
    expect(backendDockerfile).toContain(
      "COPY --from=build --chown=nestjs:nodejs /app/backend ./backend",
    );
    expect(backendDockerfile).toContain(
      "COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules",
    );
    expect(backendDockerfile).toContain(
      "COPY --from=build --chown=nestjs:nodejs /app/shared ./shared",
    );
    expect(backendDockerfile).toContain(
      "COPY --from=build --chown=nestjs:nodejs /app/database ./database",
    );
    expect(backendDockerfile).not.toContain(
      "COPY --from=build --chown=nestjs:nodejs /app/backend/dist ./dist",
    );
  });
});

