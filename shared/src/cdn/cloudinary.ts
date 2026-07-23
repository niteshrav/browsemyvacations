/**
 * Cloudinary image CDN delivery.
 * Remote origins (Unsplash, site assets) are fetched through Cloudinary so
 * travel photos and logos hit an edge CDN with automatic format/quality.
 */

export type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  /** Defaults to fill when width or height is set. */
  crop?: "fill" | "fit" | "limit" | "scale" | "thumb";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
};

/**
 * Prefer an explicit `env` in tests. Production/Next reads `process.env` directly
 * so `NEXT_PUBLIC_*` values are inlined by the bundler.
 */
export function resolveCloudinaryCloudName(
  env?: NodeJS.ProcessEnv,
): string | undefined {
  if (env) {
    const name =
      env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() || env.CLOUDINARY_CLOUD_NAME?.trim();
    return name || undefined;
  }
  const name =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.CLOUDINARY_CLOUD_NAME?.trim();
  return name || undefined;
}

export function isCloudinaryHostedUrl(url: string): boolean {
  try {
    return new URL(url).hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}

function buildTransformSegment(options: CloudinaryTransformOptions): string {
  const parts: string[] = [];
  const format = options.format ?? "auto";
  const quality = options.quality ?? "auto";
  parts.push(`f_${format}`);
  parts.push(`q_${quality}`);
  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  if (options.crop) {
    parts.push(`c_${options.crop}`);
  } else if (options.width || options.height) {
    parts.push("c_fill");
  }
  return parts.join(",");
}

/**
 * Deliver a remote image via Cloudinary fetch CDN.
 * Passes through when Cloudinary is not configured, the URL is already on
 * Cloudinary, or the source is not an absolute http(s) URL.
 */
export function deliverCdnImageUrl(
  sourceUrl: string,
  options: CloudinaryTransformOptions = {},
  env?: NodeJS.ProcessEnv,
): string {
  const trimmed = sourceUrl.trim();
  if (!trimmed) return sourceUrl;

  const cloudName = resolveCloudinaryCloudName(env);
  if (!cloudName) return trimmed;
  if (isCloudinaryHostedUrl(trimmed)) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) return trimmed;

  const transforms = buildTransformSegment(options);
  const encodedSource = encodeURIComponent(trimmed);
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodedSource}`;
}

/**
 * Delivery URL for an uploaded Cloudinary asset (public_id path, no extension required).
 */
export function buildCloudinaryUploadUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {},
  env?: NodeJS.ProcessEnv,
): string | undefined {
  const cloudName = resolveCloudinaryCloudName(env);
  const id = publicId.trim().replace(/^\/+/, "");
  if (!cloudName || !id) return undefined;

  const transforms = buildTransformSegment(options);
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${id}`;
}

function readEnvValue(key: string, env?: NodeJS.ProcessEnv): string {
  if (env) return env[key]?.trim() ?? "";
  // Direct access keeps NEXT_PUBLIC_* inlinable under Next.js.
  if (key === "NEXT_PUBLIC_CLOUDINARY_BRAND_LOGO_ID") {
    return process.env.NEXT_PUBLIC_CLOUDINARY_BRAND_LOGO_ID?.trim() ?? "";
  }
  if (key === "NEXT_PUBLIC_SITE_URL") {
    return process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  }
  return process.env[key]?.trim() ?? "";
}

/**
 * Brand / site-relative assets: prefer an uploaded public_id, else fetch the
 * absolute public site URL through Cloudinary (production only).
 */
export function deliverBrandAssetUrl(
  relativePath: string,
  options: {
    publicIdEnv?: string;
    siteUrlEnv?: string;
    transforms?: CloudinaryTransformOptions;
  } = {},
  env?: NodeJS.ProcessEnv,
): string {
  const publicIdKey = options.publicIdEnv ?? "NEXT_PUBLIC_CLOUDINARY_BRAND_LOGO_ID";
  const siteUrlKey = options.siteUrlEnv ?? "NEXT_PUBLIC_SITE_URL";
  const transforms = options.transforms ?? { format: "auto", quality: "auto" };

  const uploaded = buildCloudinaryUploadUrl(readEnvValue(publicIdKey, env), transforms, env);
  if (uploaded) return uploaded;

  const siteUrl = readEnvValue(siteUrlKey, env).replace(/\/$/, "");
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  if (siteUrl && !/localhost|127\.0\.0\.1/i.test(siteUrl)) {
    return deliverCdnImageUrl(`${siteUrl}${path}`, transforms, env);
  }

  return path;
}
