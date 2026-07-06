export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_DEFAULT_REDIRECT = "/admin/destinations";

export function isAdminLoginPath(pathname: string): boolean {
  return pathname === ADMIN_LOGIN_PATH;
}

export function shouldProtectAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin") && !isAdminLoginPath(pathname);
}
