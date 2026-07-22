/**
 * Resolves whether a browser Origin is allowed for CORS.
 * Supports comma-separated CORS_ORIGIN and DCDeploy demo hosts.
 */
export function isAllowedCorsOrigin(
  requestOrigin: string | undefined,
  corsOriginEnv: string | undefined,
  fallbackOrigin: string,
): boolean {
  if (!requestOrigin) return true;

  const configured = (corsOriginEnv ?? fallbackOrigin)
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  if (configured.includes("*") || configured.includes(requestOrigin)) {
    return true;
  }

  try {
    const { hostname } = new URL(requestOrigin);
    // DCDeploy assigns per-service hosts; allow same platform for demo/prod deploys.
    if (hostname.endsWith(".dcdeploy.cloud")) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export function createCorsOriginDelegate(
  corsOriginEnv: string | undefined,
  fallbackOrigin: string,
) {
  return (
    requestOrigin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (isAllowedCorsOrigin(requestOrigin, corsOriginEnv, fallbackOrigin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  };
}
