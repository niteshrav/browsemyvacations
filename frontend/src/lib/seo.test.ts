import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("seo helpers", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://browsemyvacations.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("builds absolute URLs", async () => {
    const { absoluteUrl } = await import("./seo");
    expect(absoluteUrl("/")).toBe("https://browsemyvacations.com/");
    expect(absoluteUrl("/packages")).toBe("https://browsemyvacations.com/packages");
    expect(absoluteUrl("about")).toBe("https://browsemyvacations.com/about");
  });

  it("includes canonical, OG, Twitter, and keywords", async () => {
    const { buildPageMetadata } = await import("./seo");
    const meta = buildPageMetadata({
      title: "Tour Packages",
      description: "Browse packages",
      path: "/packages",
      keywords: ["Rajasthan packages"],
    });

    expect(meta.title).toBe("Tour Packages");
    expect(meta.description).toBe("Browse packages");
    expect(meta.keywords).toEqual(["Rajasthan packages"]);
    expect(meta.alternates).toEqual({
      canonical: "https://browsemyvacations.com/packages",
    });
    expect(meta.openGraph?.url).toBe("https://browsemyvacations.com/packages");
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });

  it("supports noindex pages", async () => {
    const { buildPageMetadata } = await import("./seo");
    const meta = buildPageMetadata({
      title: "Admin",
      description: "Private",
      path: "/admin",
      index: false,
    });
    expect(meta.robots).toMatchObject({ index: false, follow: true });
  });
});
