import { BMV_DEV_API_V1_URL } from "@bmv/shared";

const TOKEN_KEY = "bmv_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function adminFetch(path: string, init?: RequestInit) {
  const token = getAdminToken();
  const base = process.env.NEXT_PUBLIC_API_URL ?? BMV_DEV_API_V1_URL;
  const isFormData = typeof FormData !== "undefined" && init?.body instanceof FormData;
  return fetch(`${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
}
