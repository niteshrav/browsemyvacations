import { BMV_DEV_API_V1_URL } from "@bmv/shared";
import { getApiUrl } from "./api";

export type AdminLoginResponse = {
  accessToken: string;
};

export function buildAdminLoginRequest(
  email: string,
  password: string,
  apiBase = process.env.NEXT_PUBLIC_API_URL ?? BMV_DEV_API_V1_URL,
) {
  return {
    url: getApiUrl("/admin/auth/login", apiBase),
    init: {
      method: "POST" as const,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  };
}

export async function adminLogin(
  email: string,
  password: string,
  apiBase?: string,
): Promise<AdminLoginResponse> {
  const { url, init } = buildAdminLoginRequest(email, password, apiBase);
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (error) {
    if (error instanceof TypeError) {
      const endpoint = new URL(url);
      throw new Error(
        `Unable to reach admin API (${endpoint.origin}). Please start backend server and check database connectivity.`,
      );
    }
    throw error;
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(err.message ?? "Login failed");
  }

  return res.json() as Promise<AdminLoginResponse>;
}
