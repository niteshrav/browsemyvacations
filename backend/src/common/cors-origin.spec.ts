import { createCorsOriginDelegate, isAllowedCorsOrigin } from "./cors-origin";

describe("CORS origin allowlist", () => {
  const fallback = "http://localhost:3100";

  it("allows configured exact origins", () => {
    expect(
      isAllowedCorsOrigin(
        "https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud",
        "https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud",
        fallback,
      ),
    ).toBe(true);
  });

  it("allows comma-separated configured origins", () => {
    expect(
      isAllowedCorsOrigin(
        "https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud",
        "https://old.example.com,https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud",
        fallback,
      ),
    ).toBe(true);
  });

  it("allows any *.dcdeploy.cloud host for DCDeploy demos", () => {
    expect(
      isAllowedCorsOrigin(
        "https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud",
        "https://browsemyvacation.cloud.dcdeploy.cloud",
        fallback,
      ),
    ).toBe(true);
  });

  it("rejects unrelated origins", () => {
    expect(
      isAllowedCorsOrigin("https://evil.example.com", "https://app.example.com", fallback),
    ).toBe(false);
  });

  it("delegate reflects allow/deny to callback", () => {
    const delegate = createCorsOriginDelegate(
      "https://browsemyvacation.cloud.dcdeploy.cloud",
      fallback,
    );
    const allowed: Array<boolean | undefined> = [];
    delegate("https://bmv-web-main-a66t9dfm4j.dcdeploy.cloud", (_err, allow) => {
      allowed.push(allow);
    });
    delegate("https://evil.example.com", (_err, allow) => {
      allowed.push(allow);
    });
    expect(allowed).toEqual([true, false]);
  });
});
