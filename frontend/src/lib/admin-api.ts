import { getApiBaseUrl, getApiUrl } from "./api";

export type AdminLoginResponse = {
  accessToken: string;
};

export function buildAdminLoginRequest(
  email: string,
  password: string,
  apiBase?: string,
) {
  const base = apiBase ?? getApiBaseUrl();
  return {
    url: getApiUrl("/admin/auth/login", base),
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
      throw new Error(
        `Unable to reach admin API (${url}). Ensure backend is running on :3101 and nginx proxies /api to it.`,
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
