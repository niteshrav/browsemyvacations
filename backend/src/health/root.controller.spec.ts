import { RootController } from "./root.controller";

describe("RootController", () => {
  it("returns API metadata", () => {
    const controller = new RootController();
    const body = controller.getRoot();
    expect(body.service).toBe("bmv-api");
    expect(body.health).toBe("/api/v1/health");
  });
});
