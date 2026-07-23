import {
  BRAND_LOGO_ALT,
  BRAND_LOGO_DISPLAY_HEIGHT,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_WIDTH,
  brandLogoIntegratedClassName,
  resolveBrandLogoSrc,
} from "@/lib/brand-logo";

type BrandLogoProps = {
  priority?: boolean;
  className?: string;
};

export function BrandLogo({ priority = false, className }: BrandLogoProps) {
  const displayWidth = Math.round((BRAND_LOGO_DISPLAY_HEIGHT * BRAND_LOGO_WIDTH) / BRAND_LOGO_HEIGHT);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolveBrandLogoSrc()}
      alt={BRAND_LOGO_ALT}
      className={className ?? brandLogoIntegratedClassName()}
      height={BRAND_LOGO_DISPLAY_HEIGHT}
      width={displayWidth}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
