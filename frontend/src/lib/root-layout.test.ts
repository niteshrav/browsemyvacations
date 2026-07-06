import { describe, expect, it } from "vitest";
import { ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING, rootBodyClassName } from "./root-layout";

describe("root-layout", () => {
  it("suppresses hydration warnings on the document root", () => {
    expect(ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING).toBe(true);
  });

  it("defines stable body classes for the root layout", () => {
    expect(rootBodyClassName()).toContain("min-h-screen");
    expect(rootBodyClassName()).toContain("bg-stone-50");
  });
});
