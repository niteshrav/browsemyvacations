import { describe, expect, it } from "vitest";
import { createLeadSchema } from "./lead.schema";

describe("createLeadSchema", () => {
  it("accepts a package detail quote lead", () => {
    const result = createLeadSchema.parse({
      fullName: "Priya Sharma",
      email: "priya@example.com",
      phone: "9876543210",
      source: "package_detail",
      packageSlug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      persons: 2,
      rooms: 1,
    });
    expect(result.fullName).toBe("Priya Sharma");
  });

  it("accepts marketingConsent flag", () => {
    const result = createLeadSchema.parse({
      fullName: "Priya",
      email: "priya@example.com",
      phone: "9876543210",
      source: "contact",
      marketingConsent: true,
    });
    expect(result.marketingConsent).toBe(true);
  });

  it("accepts a contact inquiry without package", () => {
    expect(
      createLeadSchema.parse({
        fullName: "Rahul",
        email: "rahul@example.com",
        phone: "9876501234",
        source: "contact",
        message: "General question",
      }),
    ).toBeTruthy();
  });

  it("rejects package source without packageSlug", () => {
    expect(() =>
      createLeadSchema.parse({
        fullName: "Test",
        email: "t@example.com",
        phone: "9876543210",
        source: "package_detail",
      }),
    ).toThrow();
  });

  it("rejects invalid email", () => {
    expect(() =>
      createLeadSchema.parse({
        fullName: "Test",
        email: "not-an-email",
        phone: "9876543210",
        source: "contact",
      }),
    ).toThrow();
  });
});
