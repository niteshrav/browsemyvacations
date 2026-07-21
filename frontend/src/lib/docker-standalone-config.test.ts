import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("DCDeploy Dockerfile standalone layout", () => {
  it("starts Next.js standalone with the correct server.js path", () => {
    const dockerfilePath = path.resolve(__dirname, "../../Dockerfile");
    const dockerfile = readFileSync(dockerfilePath, "utf8");

    expect(dockerfile).toContain("FROM node:22-bookworm-slim AS builder");
    expect(dockerfile).toContain("FROM node:22-bookworm-slim AS runner");
    expect(dockerfile).toContain('COPY --from=builder /app/frontend/public ./public');
    expect(dockerfile).toContain('COPY --from=builder /app/frontend/.next/static ./.next/static');
    expect(dockerfile).toContain('CMD ["node", "server.js"]');
  });

  it("builds the backend with a Node 22 base and correct healthcheck", () => {
    const backendDockerfilePath = path.resolve(__dirname, "../../../backend/Dockerfile");
    const backendDockerfile = readFileSync(backendDockerfilePath, "utf8");

    expect(backendDockerfile).toContain("FROM node:22-alpine AS base");
    expect(backendDockerfile).toContain("http://localhost:3001/api/v1/health");
    expect(backendDockerfile).toContain('CMD ["node", "dist/main.js"]');
  });
});

