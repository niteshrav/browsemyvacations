import {
  BRAND_LOGO_ALT,
  BRAND_LOGO_DISPLAY_HEIGHT,
  BRAND_LOGO_SRC,
  brandLogoIntegratedClassName,
} from "@/lib/brand-logo";

type BrandLogoProps = {
  priority?: boolean;
  className?: string;
};

export function BrandLogo({ priority = false, className }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND_LOGO_SRC}
      alt={BRAND_LOGO_ALT}
      className={className ?? brandLogoIntegratedClassName()}
      height={BRAND_LOGO_DISPLAY_HEIGHT}
      width={Math.round((BRAND_LOGO_DISPLAY_HEIGHT * 1536) / 1024)}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
