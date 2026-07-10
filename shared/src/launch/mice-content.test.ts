import { describe, expect, it } from "vitest";
import { MICE_PAGE } from "./mice-content";

describe("mice page content", () => {
  it("includes all major sections from the client draft", () => {
    expect(MICE_PAGE.hero.heading).toContain("Corporate Retreats");
    expect(MICE_PAGE.services.items).toHaveLength(6);
    expect(MICE_PAGE.whyBmv.items).toHaveLength(5);
    expect(MICE_PAGE.destinations.items).toHaveLength(15);
    expect(MICE_PAGE.handles.items).toHaveLength(9);
    expect(MICE_PAGE.clients.items).toHaveLength(8);
    expect(MICE_PAGE.formats.items).toHaveLength(6);
    expect(MICE_PAGE.process.steps).toHaveLength(5);
    expect(MICE_PAGE.seo.paragraphs.length).toBeGreaterThanOrEqual(2);
  });
});
