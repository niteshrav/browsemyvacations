/**
 * PM2 process file for VPS (ResellerClub / Hostinger-style).
 * Usage from repo root:
 *   pm2 delete bmv-web bmv-api
 *   pm2 start ecosystem.config.cjs --update-env
 *   pm2 save
 *
 * Keep only these two apps — delete duplicate web processes that cause
 * ChunkLoadError / 502 after rebuilds.
 *
 * Do NOT use `pm2 start npm -- start` (prints npm help and crash-loops).
 */
const path = require("path");

const root = __dirname;
const frontendNext = path.join(root, "frontend", "node_modules", "next", "dist", "bin", "next");
const backendMain = path.join(root, "backend", "dist", "main.js");

module.exports = {
  apps: [
    {
      name: "bmv-api",
      cwd: path.join(root, "backend"),
      script: backendMain,
      instances: 1,
      exec_mode: "fork",
      max_restarts: 20,
      min_uptime: "5s",
      env: {
        NODE_ENV: "production",
        PORT: 3101,
      },
    },
    {
      name: "bmv-web",
      cwd: path.join(root, "frontend"),
      script: frontendNext,
      args: "start -H 0.0.0.0 -p 3100",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      max_restarts: 20,
      min_uptime: "5s",
      env: {
        NODE_ENV: "production",
        PORT: 3100,
      },
    },
  ],
};
