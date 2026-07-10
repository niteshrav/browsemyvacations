import { describe, expect, it } from "vitest";
import { ABOUT_PAGE } from "./about-content";

describe("about page content", () => {
  it("includes hero, curate cards, philosophy, and CTAs", () => {
    expect(ABOUT_PAGE.hero.heading).toBe("Travel, Curated More Thoughtfully");
    expect(ABOUT_PAGE.hero.intro.length).toBeGreaterThan(40);
    expect(ABOUT_PAGE.curate.cards).toHaveLength(3);
    expect(ABOUT_PAGE.philosophy.body.length).toBeGreaterThan(40);
    expect(ABOUT_PAGE.footerCta.primaryCta.href).toBe("/packages");
    expect(ABOUT_PAGE.footerCta.secondaryCta.href).toBe("/contact");
  });
});
