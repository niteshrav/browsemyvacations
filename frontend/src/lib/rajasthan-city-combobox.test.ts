import { describe, expect, it } from "vitest";
import {
  rajasthanCityComboboxInputShellClassName,
  rajasthanCitySuggestionsListClassName,
  resolveCitySelection,
  shouldShowRajasthanCityList,
} from "./rajasthan-city-combobox";

describe("shouldShowRajasthanCityList", () => {
  it("shows list only when open and suggestions exist", () => {
    expect(shouldShowRajasthanCityList(true, 3)).toBe(true);
    expect(shouldShowRajasthanCityList(false, 3)).toBe(false);
    expect(shouldShowRajasthanCityList(true, 0)).toBe(false);
  });
});

describe("resolveCitySelection", () => {
  it("returns exact city match", () => {
    expect(resolveCitySelection("jaipur", ["Jaipur", "Jodhpur"])).toBe("Jaipur");
  });

  it("returns sole suggestion when only one remains", () => {
    expect(resolveCitySelection("jai", ["Jaipur"])).toBe("Jaipur");
  });
});

describe("rajasthan city combobox layout", () => {
  it("keeps the input shell compact for inline hero search", () => {
    expect(rajasthanCityComboboxInputShellClassName()).toContain("rounded-lg");
    expect(rajasthanCityComboboxInputShellClassName()).not.toContain("flex-col");
  });

  it("renders suggestions as a floating overlay", () => {
    expect(rajasthanCitySuggestionsListClassName()).toContain("absolute");
    expect(rajasthanCitySuggestionsListClassName()).toContain("top-full");
    expect(rajasthanCitySuggestionsListClassName()).toContain("z-20");
  });
});
