import { describe, expect, it } from "vitest";
import { buildSitemapEntries } from "./sitemap-entries";

describe("buildSitemapEntries", () => {
  it("includes static routes and package URLs", () => {
    const entries = buildSitemapEntries(
      "https://www.example.com",
      [{ path: "/", priority: 1 }],
      ["standalone-single-city-udaipur-the-romantic-lake-escape"],
    );
    expect(entries).toHaveLength(2);
    expect(entries[0]?.url).toBe("https://www.example.com/");
    expect(entries[1]?.url).toBe("https://www.example.com/packages/standalone-single-city-udaipur-the-romantic-lake-escape");
  });
});
