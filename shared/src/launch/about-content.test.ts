import { describe, expect, it } from "vitest";
import { ABOUT_PAGE } from "./about-content";

describe("about page content", () => {
  it("includes company story, trust signals, and a contact path", () => {
    expect(ABOUT_PAGE.heading).toBe("About Browse My Vacations");
    expect(ABOUT_PAGE.intro.length).toBeGreaterThan(40);
    expect(ABOUT_PAGE.sections).toHaveLength(2);
    expect(ABOUT_PAGE.sections[1]?.bullets?.length).toBeGreaterThanOrEqual(3);
    expect(ABOUT_PAGE.contactCta.href).toBe("/contact");
  });
});
