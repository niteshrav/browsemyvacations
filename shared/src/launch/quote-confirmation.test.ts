import { describe, expect, it } from "vitest";
import {
  ADMIN_LEADS_PIPELINE_NOTE,
  LEAD_QUOTE_CONFIRMATION_MESSAGE,
} from "./quote-confirmation";

describe("quote confirmation copy", () => {
  it("tells customers that submission is not a confirmed booking", () => {
    expect(LEAD_QUOTE_CONFIRMATION_MESSAGE).toContain("custom quote");
    expect(LEAD_QUOTE_CONFIRMATION_MESSAGE.toLowerCase()).toContain("does not confirm");
  });

  it("reminds admins that pricing is handled offline", () => {
    expect(ADMIN_LEADS_PIPELINE_NOTE).toContain("offline");
  });
});
