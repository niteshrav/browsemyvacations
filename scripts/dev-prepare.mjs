#!/usr/bin/env node
import { execSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(command) {
  execSync(command, { cwd: repoRoot, stdio: "inherit", env: { ...process.env, PATH: process.env.PATH } });
}

function dockerCompose(command) {
  const bin = process.env.DOCKER_COMPOSE_BIN ?? "docker-compose";
  run(`${bin} ${command}`);
}

function postgresReady() {
  try {
    execSync(`${process.env.DOCKER_COMPOSE_BIN ?? "docker-compose"} exec -T postgres pg_isready -U bmv -d browsemyvacations`, {
      cwd: repoRoot,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

async function waitForPostgres(maxAttempts = 30) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (postgresReady()) {
      return;
    }
    await delay(1_000);
  }
  throw new Error("PostgreSQL did not become ready in time. Is Docker running?");
}

console.log("Preparing local development stack...");
dockerCompose("up -d");
await waitForPostgres();
run("pnpm db:generate");
run("pnpm db:push");
run("pnpm db:seed");
console.log("Local catalog database is ready.");
