import { describe, expect, it } from "vitest";
import { adminLoginSchema } from "./auth.schema";

describe("adminLoginSchema", () => {
  it("requires email and password", () => {
    expect(adminLoginSchema.safeParse({ email: "a@b.com", password: "secret" }).success).toBe(
      true,
    );
    expect(adminLoginSchema.safeParse({ email: "bad", password: "x" }).success).toBe(false);
    expect(adminLoginSchema.safeParse({}).success).toBe(false);
  });
});
