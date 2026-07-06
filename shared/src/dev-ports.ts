/** Local dev frontend — kept off 3000 for other projects (e.g. NextSaas). */
export const BMV_DEV_WEB_PORT = 3100;

/** Local dev API — kept off 3001 for other projects (e.g. NextSaas). */
export const BMV_DEV_API_PORT = 3101;

/** Playwright web server (matches dev web port). */
export const BMV_E2E_WEB_PORT = 3100;

/** Playwright API server (offset from dev API to allow parallel runs). */
export const BMV_E2E_API_PORT = 3102;

export const BMV_DEV_SITE_URL = `http://localhost:${BMV_DEV_WEB_PORT}`;

export const BMV_DEV_API_BASE_URL = `http://localhost:${BMV_DEV_API_PORT}`;

export const BMV_DEV_API_V1_URL = `${BMV_DEV_API_BASE_URL}/api/v1`;

export const LEGACY_DEV_WEB_PORT = 3000;

export const LEGACY_DEV_API_PORT = 3001;
