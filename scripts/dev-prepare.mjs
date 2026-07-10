#!/usr/bin/env node
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED_TIMEOUT_MS = 120_000;

function run(command) {
  execSync(command, { cwd: repoRoot, stdio: "inherit", env: { ...process.env, PATH: process.env.PATH } });
}

function tryRun(command) {
  try {
    run(command);
    return true;
  } catch {
    return false;
  }
}

function tryRunWithTimeout(command, timeoutMs = SEED_TIMEOUT_MS) {
  return new Promise((resolve) => {
    const child = spawn(command, {
      cwd: repoRoot,
      shell: true,
      stdio: "inherit",
      env: { ...process.env, PATH: process.env.PATH },
    });
    const timer = setTimeout(() => {
      child.kill();
      resolve(false);
    }, timeoutMs);
    child.on("exit", (code) => {
      clearTimeout(timer);
      resolve(code === 0);
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
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

function dockerAvailable() {
  try {
    execSync("docker info", { cwd: repoRoot, stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function shouldSkipDocker() {
  return process.env.BMV_DEV_SKIP_DOCKER === "1" || process.env.BMV_DEV_SKIP_DOCKER === "true";
}

function shouldSkipDbPrep() {
  return process.env.BMV_DEV_SKIP_DB_PREPARE === "1" || process.env.BMV_DEV_SKIP_DB_PREPARE === "true";
}

const LOCAL_DATABASE_URL =
  "postgresql://bmv:bmv@localhost:5434/browsemyvacations?schema=public";

function writeLocalEnvOverrides() {
  const backendLocal = path.join(repoRoot, "backend", ".env.local");
  const databaseLocal = path.join(repoRoot, "database", ".env.local");
  const body = [
    "# Auto-generated for local Docker PostgreSQL (see scripts/dev-prepare.mjs)",
    `DATABASE_URL="${LOCAL_DATABASE_URL}"`,
    `DIRECT_URL="${LOCAL_DATABASE_URL}"`,
    'REDIS_URL="redis://localhost:6379"',
    "",
  ].join("\n");

  fs.writeFileSync(backendLocal, body, "utf8");
  fs.writeFileSync(databaseLocal, body, "utf8");
  console.log("Wrote backend/.env.local and database/.env.local for local Docker.");
}

console.log("Preparing local development stack...");
const skipDocker = shouldSkipDocker();
const dockerReady = !skipDocker && dockerAvailable();

if (skipDocker) {
  console.log("Skipping Docker startup (BMV_DEV_SKIP_DOCKER is enabled).");
} else if (!dockerReady) {
  console.warn("Docker is not available. Continuing without docker-compose.");
} else {
  dockerCompose("up -d");
  await waitForPostgres();
  writeLocalEnvOverrides();
}

if (shouldSkipDbPrep()) {
  console.log("Skipping DB prepare (BMV_DEV_SKIP_DB_PREPARE is enabled).");
  process.exit(0);
}

tryRun("pnpm db:generate");

const pushOk = tryRun("pnpm db:push");
if (!pushOk) {
  console.warn("Skipping db push due to connection/setup issue. Backend may fail until DATABASE_URL is reachable.");
}

const seedOk = pushOk ? await tryRunWithTimeout("pnpm db:seed") : false;
if (pushOk && !seedOk) {
  console.warn("Full db seed timed out or failed. Seeding admin user only...");
  tryRun("pnpm db:seed:admin");
}

if (pushOk && seedOk) {
  console.log("Local catalog database is ready.");
} else {
  console.log("Development stack prepared in partial mode.");
}
