import { describe, expect, it } from "vitest";
import { adminLeadsPipelineNote } from "./admin-leads-ui";

describe("admin leads ui", () => {
  it("explains that leads are not confirmed bookings", () => {
    expect(adminLeadsPipelineNote()).toContain("offline");
  });
});
