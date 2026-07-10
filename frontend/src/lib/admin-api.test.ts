import { BMV_E2E_API_PORT } from "@bmv/shared";
import { describe, expect, it, vi } from "vitest";
import { adminLogin, buildAdminLoginRequest } from "./admin-api";

const e2eApiBase = `http://localhost:${BMV_E2E_API_PORT}/api/v1`;

describe("buildAdminLoginRequest", () => {
  it("builds a client-safe POST request for admin auth", () => {
    expect(buildAdminLoginRequest("admin@browsemyvacations.com", "changeme123", e2eApiBase)).toEqual(
      {
        url: `${e2eApiBase}/admin/auth/login`,
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "admin@browsemyvacations.com",
            password: "changeme123",
          }),
        },
      },
    );
  });

  it("does not include Next.js server-only fetch options", () => {
    const { init } = buildAdminLoginRequest("a@b.com", "secret", e2eApiBase);
    expect(init).not.toHaveProperty("next");
  });
});

describe("adminLogin", () => {
  it("returns access token on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ accessToken: "token-123" }),
      }),
    );

    await expect(
      adminLogin("admin@browsemyvacations.com", "changeme123", e2eApiBase),
    ).resolves.toEqual({ accessToken: "token-123" });
  });

  it("throws API message on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Invalid credentials" }),
      }),
    );

    await expect(adminLogin("admin@browsemyvacations.com", "wrong", e2eApiBase)).rejects.toThrow(
      "Invalid credentials",
    );
  });

  it("throws helpful message when API is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    await expect(adminLogin("admin@browsemyvacations.com", "changeme123", e2eApiBase)).rejects.toThrow(
      "Unable to reach admin API",
    );
  });
});
