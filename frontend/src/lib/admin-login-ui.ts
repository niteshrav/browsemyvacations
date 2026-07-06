import {
  DEFAULT_ADMIN_SEED_EMAIL,
  DEFAULT_ADMIN_SEED_PASSWORD,
  resolveAdminSeedCredentials,
} from "@bmv/shared";

export const ADMIN_LOGIN_TRIGGER_LABEL = "Admin";
export const ADMIN_LOGIN_DIALOG_TITLE = "Admin login";
export const ADMIN_SEED_CREDENTIALS_LABEL = "Seeded credentials";

export type AdminSeedCredentialsDisplay = {
  email: string;
  password: string;
};

export function getAdminSeedCredentialsForDisplay(): AdminSeedCredentialsDisplay {
  return resolveAdminSeedCredentials({});
}

export function isDefaultAdminSeedCredentials(credentials: AdminSeedCredentialsDisplay): boolean {
  return (
    credentials.email === DEFAULT_ADMIN_SEED_EMAIL &&
    credentials.password === DEFAULT_ADMIN_SEED_PASSWORD
  );
}
