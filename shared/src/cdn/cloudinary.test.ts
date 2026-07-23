import { afterEach, describe, expect, it } from "vitest";
import {
  buildCloudinaryUploadUrl,
  deliverBrandAssetUrl,
  deliverCdnImageUrl,
  isCloudinaryHostedUrl,
  resolveCloudinaryCloudName,
} from "./cloudinary";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  delete process.env.CLOUDINARY_CLOUD_NAME;
  delete process.env.NEXT_PUBLIC_CLOUDINARY_BRAND_LOGO_ID;
  delete process.env.NEXT_PUBLIC_SITE_URL;
});

describe("cloudinary CDN delivery", () => {
  it("resolves cloud name from public or server env", () => {
    expect(resolveCloudinaryCloudName({})).toBeUndefined();
    expect(
      resolveCloudinaryCloudName({ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv-demo" }),
    ).toBe("bmv-demo");
    expect(resolveCloudinaryCloudName({ CLOUDINARY_CLOUD_NAME: "bmv-api" })).toBe("bmv-api");
  });

  it("detects Cloudinary-hosted URLs", () => {
    expect(isCloudinaryHostedUrl("https://res.cloudinary.com/demo/image/upload/v1/x.jpg")).toBe(
      true,
    );
    expect(isCloudinaryHostedUrl("https://images.unsplash.com/photo-1")).toBe(false);
  });

  it("passes through when Cloudinary is not configured", () => {
    const src = "https://images.unsplash.com/photo-123?auto=format&w=1200";
    expect(deliverCdnImageUrl(src, {}, {})).toBe(src);
  });

  it("wraps remote images in Cloudinary fetch URLs", () => {
    const src = "https://images.unsplash.com/photo-123?auto=format&w=1200";
    const out = deliverCdnImageUrl(src, { width: 1200 }, { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv" });
    expect(out).toContain("https://res.cloudinary.com/bmv/image/fetch/");
    expect(out).toContain("f_auto");
    expect(out).toContain("q_auto");
    expect(out).toContain("w_1200");
    expect(out).toContain(encodeURIComponent(src));
  });

  it("does not re-wrap Cloudinary URLs or relative paths", () => {
    const hosted = "https://res.cloudinary.com/bmv/image/upload/v1/bmv/packages/a.jpg";
    expect(
      deliverCdnImageUrl(hosted, {}, { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv" }),
    ).toBe(hosted);
    expect(deliverCdnImageUrl("/brand/logo.png", {}, { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv" })).toBe(
      "/brand/logo.png",
    );
  });

  it("builds upload delivery URLs for public ids", () => {
    expect(
      buildCloudinaryUploadUrl("bmv/brand/logo", {}, { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv" }),
    ).toBe("https://res.cloudinary.com/bmv/image/upload/f_auto,q_auto/bmv/brand/logo");
  });

  it("delivers brand assets from upload id, then site fetch, else local path", () => {
    expect(deliverBrandAssetUrl("/brand/logo.png", {}, {})).toBe("/brand/logo.png");

    expect(
      deliverBrandAssetUrl(
        "/brand/logo.png",
        {},
        {
          NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv",
          NEXT_PUBLIC_CLOUDINARY_BRAND_LOGO_ID: "bmv/brand/logo",
        },
      ),
    ).toContain("/image/upload/");

    const fetched = deliverBrandAssetUrl(
      "/brand/logo.png",
      {},
      {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv",
        NEXT_PUBLIC_SITE_URL: "https://www.browsemyvacations.com",
      },
    );
    expect(fetched).toContain("/image/fetch/");
    expect(fetched).toContain(encodeURIComponent("https://www.browsemyvacations.com/brand/logo.png"));

    expect(
      deliverBrandAssetUrl(
        "/brand/logo.png",
        {},
        {
          NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "bmv",
          NEXT_PUBLIC_SITE_URL: "http://localhost:3100",
        },
      ),
    ).toBe("/brand/logo.png");
  });
});
