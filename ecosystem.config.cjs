/**
 * PM2 process file for VPS (ResellerClub / Hostinger-style).
 * Usage from repo root:
 *   pm2 startOrReload ecosystem.config.cjs --update-env
 *   pm2 save
 *
 * Keep only these two apps — delete duplicate web processes that cause
 * ChunkLoadError / 502 after rebuilds.
 */
module.exports = {
  apps: [
    {
      name: "bmv-api",
      cwd: "./backend",
      script: "dist/main.js",
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
      cwd: "./frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3100",
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
