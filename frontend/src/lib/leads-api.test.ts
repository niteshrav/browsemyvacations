import { describe, expect, it, vi } from "vitest";
import { API_UNREACHABLE_MESSAGE, submitLead } from "./leads-api";

describe("submitLead", () => {
  it("throws a friendly message when the API is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    await expect(
      submitLead({
        fullName: "Test User",
        email: "test@example.com",
        phone: "9876543210",
        source: "contact",
      }),
    ).rejects.toThrow(API_UNREACHABLE_MESSAGE);
  });

  it("returns lead response on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: "lead-1", message: "Thank you!" }),
      }),
    );

    await expect(
      submitLead({
        fullName: "Test User",
        email: "test@example.com",
        phone: "9876543210",
        source: "contact",
      }),
    ).resolves.toEqual({ id: "lead-1", message: "Thank you!" });
  });
});
