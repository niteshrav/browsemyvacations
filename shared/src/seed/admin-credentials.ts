export const DEFAULT_ADMIN_SEED_EMAIL = "admin@browsemyvacations.com" as const;
export const DEFAULT_ADMIN_SEED_PASSWORD = "changeme123" as const;

export type AdminSeedEnv = {
  ADMIN_SEED_EMAIL?: string;
  ADMIN_SEED_PASSWORD?: string;
};

export function resolveAdminSeedCredentials(
  env: AdminSeedEnv = {},
): { email: string; password: string } {
  const email = env.ADMIN_SEED_EMAIL?.trim();
  const password = env.ADMIN_SEED_PASSWORD;

  return {
    email: email && email.length > 0 ? email : DEFAULT_ADMIN_SEED_EMAIL,
    password: password && password.length > 0 ? password : DEFAULT_ADMIN_SEED_PASSWORD,
  };
}
