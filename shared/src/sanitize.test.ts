import { describe, expect, it } from "vitest";
import { stripHtmlTags } from "./sanitize";

describe("stripHtmlTags", () => {
  it("removes script tags", () => {
    expect(stripHtmlTags("<script>x</script>Hello")).toBe("xHello");
  });

  it("leaves plain text unchanged", () => {
    expect(stripHtmlTags("Udaipur trip")).toBe("Udaipur trip");
  });
});
