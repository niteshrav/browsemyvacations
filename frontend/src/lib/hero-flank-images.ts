import { BMV_DEV_API_BASE_URL, collectHeroTourismPhotoUrls } from "@bmv/shared";

/** Left collage tiles — diamond 1-2-3-2-1 (reference toggle layout). */
export const HERO_COLLAGE_COUNT = 9;

/** Row index groups for the diamond collage (top → bottom). */
export const HERO_COLLAGE_ROWS: readonly (readonly number[])[] = [
  [0],
  [1, 2],
  [3, 4, 5],
  [6, 7],
  [8],
];

/**
 * High-res Taj Lake Palace (Udaipur) — white palace on water with hills,
 * matching the homepage hero reference.
 */
export const HERO_BACKGROUND_REMOTE =
  "https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=2400&h=1400&q=85";

/** Filename served from the Nest uploads static folder (offline fallback). */
export const HERO_BACKGROUND_FILENAME = "udaipur-city-palace.png";

/**
 * Full-bleed hero background — Lake Palace by default.
 * Optional override: NEXT_PUBLIC_HERO_BACKGROUND_URL
 * Optional local: NEXT_PUBLIC_HERO_USE_LOCAL_BACKGROUND=1
 */
export function resolveHeroBackgroundSrc(
  apiBase = process.env.NEXT_PUBLIC_API_URL,
): string {
  if (process.env.NEXT_PUBLIC_HERO_BACKGROUND_URL?.trim()) {
    return process.env.NEXT_PUBLIC_HERO_BACKGROUND_URL.trim();
  }
  if (process.env.NEXT_PUBLIC_HERO_USE_LOCAL_BACKGROUND === "1") {
    const origin = (apiBase?.trim() || BMV_DEV_API_BASE_URL).replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    if (origin) {
      return `${origin}/uploads/${HERO_BACKGROUND_FILENAME}`;
    }
    return `/hero/${HERO_BACKGROUND_FILENAME}`;
  }
  return HERO_BACKGROUND_REMOTE;
}

/** Local/remote full-bleed hero background (City Palace, Udaipur). */
export const HERO_BACKGROUND_SRC = resolveHeroBackgroundSrc();

export type HeroFlankImages = {
  left: string[];
  right: string[];
};

export function heroStageClassName(): string {
  return "relative w-full min-h-[34rem] overflow-hidden bg-[#f7f5f0] sm:min-h-[38rem] lg:min-h-[46rem]";
}

/** Full-bleed destination photo behind the entire hero. */
export function heroHalfBackgroundClassName(): string {
  return "pointer-events-none absolute inset-0 z-0";
}

/**
 * Soft wash — photo stays visible full-bleed; light veil for text contrast.
 */
export function heroBackgroundOverlayClassName(): string {
  return "absolute inset-0 bg-gradient-to-r from-white/45 via-white/20 to-white/10";
}

export function heroBackgroundBottomFadeClassName(): string {
  return "absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 via-white/30 to-transparent";
}

export function heroFlankPanelClassName(side: "left" | "right"): string {
  if (side === "left") {
    return "relative z-20 hidden w-full max-w-[24rem] shrink-0 lg:block xl:max-w-[27rem]";
  }
  return heroHalfBackgroundClassName();
}

export function heroFlankPanelHiddenClassName(): string {
  return "hidden";
}

/**
 * Shared chrome for diamond collage tiles — rounded cards, soft shadow.
 */
export function heroCollageImageClassName(): string {
  return "group relative shrink-0 overflow-hidden rounded-[1.25rem] border-2 border-white bg-stone-100 shadow-[0_12px_32px_rgba(15,23,42,0.18)] ring-1 ring-stone-900/5 transition-all duration-500 ease-out hover:z-20 hover:scale-[1.04] hover:shadow-[0_20px_44px_rgba(15,23,42,0.24)]";
}

/** Larger toggle tiles (~35% bigger than before). */
export function heroCollageTileClassName(): string {
  return "h-[7rem] w-[7.75rem] xl:h-[7.75rem] xl:w-[8.5rem]";
}

export function heroCollageRowClassName(): string {
  return "relative z-[2] flex items-center justify-center gap-3 xl:gap-3.5";
}

export function heroCollageCanvasClassName(): string {
  return "relative mx-auto flex w-full flex-col items-center gap-3 xl:gap-3.5";
}

export function heroCollageDecorClassName(): string {
  return "pointer-events-none absolute inset-0 z-[1]";
}

/** @deprecated Absolute slots replaced by diamond flex rows — kept for older imports. */
export function heroCollageSlotClassName(index: number): string {
  void index;
  return `absolute ${heroCollageTileClassName()}`;
}

export function heroFeaturedImageClassName(): string {
  return "absolute inset-0 h-full w-full scale-[1.02] object-cover object-center opacity-100";
}

/** @deprecated Prefer heroCollageImageClassName — kept for older imports. */
export function heroFlankImageClassName(): string {
  return heroCollageImageClassName();
}

export function hashString(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function buildHeroFlankImageUrl(fullUrl: string): string {
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=480&h=420&q=85");
}

/** Landscape-friendly crop for remote full-bleed backgrounds. */
export function buildHeroFeaturedImageUrl(fullUrl: string): string {
  if (fullUrl.startsWith("/") || fullUrl.includes("/uploads/")) return fullUrl;
  if (fullUrl.includes("w=2400")) return fullUrl;
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=2400&h=1400&q=85");
}

export function getHeroImagePool(): string[] {
  return collectHeroTourismPhotoUrls().map(buildHeroFlankImageUrl);
}

export function pickNextHeroImage(
  pool: readonly string[],
  current: string,
  salt: string,
): string {
  const options = pool.filter((url) => url && url !== current);
  if (options.length === 0) {
    return current;
  }
  return options[hashString(salt) % options.length] ?? current;
}

/** Light stagger tilt like the reference masonry. */
export function heroFlankImageOffsetClassName(index: number, side: "left" | "right"): string {
  void index;
  void side;
  return "";
}

export function selectHeroFlankImages(
  urls: readonly string[],
  anchor: string,
): HeroFlankImages {
  const pool = urls.filter(Boolean);
  if (pool.length === 0) {
    return { left: [], right: [HERO_BACKGROUND_SRC] };
  }

  const start = hashString(anchor) % pool.length;
  const pick = (offset: number) => pool[(start + offset) % pool.length] ?? pool[0];

  const collage = Array.from({ length: HERO_COLLAGE_COUNT }, (_, index) =>
    buildHeroFlankImageUrl(pick(index)),
  );

  return {
    left: collage,
    right: [buildHeroFeaturedImageUrl(HERO_BACKGROUND_SRC)],
  };
}

export function shuffleHeroFlankImages(anchor: string, salt: number): HeroFlankImages {
  return selectHeroFlankImages(collectHeroTourismPhotoUrls(), `${anchor}:${salt}`);
}

export function getHeroFlankImages(anchor: string): HeroFlankImages {
  return selectHeroFlankImages(collectHeroTourismPhotoUrls(), anchor);
}

/** Backward-compatible alias used by older tests. */
export const HERO_FLANK_IMAGE_COUNT_PER_SIDE = HERO_COLLAGE_COUNT;
