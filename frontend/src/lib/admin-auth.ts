import { BMV_DEV_API_V1_URL } from "@bmv/shared";
import { adminLogin } from "./admin-api";
import { ADMIN_LOGIN_PATH } from "./admin-routes";

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

type AdminJwtPayload = {
  email?: string;
  role?: string;
};

export function getAdminProfileFromToken(): { email: string; role: string } | null {
  const token = getAdminToken();
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2 || !parts[1]) return null;
    const payloadJson = atob(parts[1]);
    const payload = JSON.parse(payloadJson) as AdminJwtPayload;
    return {
      email: payload.email ?? "admin@browsemyvacations.com",
      role: payload.role ?? "admin",
    };
  } catch {
    return null;
  }
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getAdminToken();
  const base = process.env.NEXT_PUBLIC_API_URL ?? BMV_DEV_API_V1_URL;
  const isFormData = typeof FormData !== "undefined" && init?.body instanceof FormData;

  const res = await fetch(
    `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...init,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    },
  );

  // Auto-logout on 401 — token expired or invalid (skip if already on login page)
  if (res.status === 401 && typeof window !== "undefined") {
    clearAdminToken();
    if (!window.location.pathname.startsWith(ADMIN_LOGIN_PATH)) {
      window.location.href = ADMIN_LOGIN_PATH;
    }
  }

  return res;
}

export async function adminChangePassword(input: {
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<{ accessToken: string }> {
  const res = await adminFetch("/admin/auth/change-password", {
    method: "POST",
    body: JSON.stringify({
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string | string[] };
    const message = Array.isArray(err.message) ? err.message.join(", ") : err.message;
    throw new Error(message ?? "Failed to change password");
  }

  const { accessToken } = await adminLogin(input.email, input.newPassword);
  return { accessToken };
}
