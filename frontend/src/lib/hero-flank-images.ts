import { collectHeroTourismPhotoUrls, MARKETING_IMAGES } from "@bmv/shared";

/** Left collage tiles in the homepage hero. */
export const HERO_COLLAGE_COUNT = 8;

export type HeroFlankImages = {
  left: string[];
  right: string[];
};

export function heroStageClassName(): string {
  return "relative w-full overflow-hidden bg-white";
}

/** Right featured photo — short column only; never behind hero copy. */
export function heroHalfBackgroundClassName(): string {
  return "relative hidden min-h-[28rem] overflow-hidden rounded-2xl lg:block xl:min-h-[32rem]";
}

export function heroFlankPanelClassName(side: "left" | "right"): string {
  if (side === "left") {
    return "hidden lg:flex min-h-[28rem] flex-col justify-center self-stretch";
  }
  return "relative hidden min-h-[28rem] overflow-hidden rounded-2xl lg:block";
}

export function heroFlankPanelHiddenClassName(): string {
  return "hidden";
}

export function heroCollageImageClassName(): string {
  return "group relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-stone-200/70 shadow-[0_4px_14px_rgba(28,25,23,0.08)] transition-all duration-500 hover:shadow-[0_8px_20px_rgba(28,25,23,0.12)]";
}



export function heroFeaturedImageClassName(): string {
  return "absolute inset-0 h-full w-full object-cover";
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
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=400&h=480&q=85");
}



export function buildHeroFeaturedImageUrl(fullUrl: string): string {
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=1600&h=2000&q=90");
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

/** Stagger collage thumbnails like the reference layout. */
export function heroFlankImageOffsetClassName(index: number, side: "left" | "right"): string {
  if (side === "right") return "";
  const offsets = [
    "translate-x-2",
    "-translate-x-1",
    "translate-x-3",
    "translate-x-0",
    "-translate-x-2",
    "translate-x-1",
    "translate-x-2",
    "-translate-x-1",
  ];
  return offsets[index % offsets.length] ?? "";
}

export function selectHeroFlankImages(
  urls: readonly string[],
  anchor: string,
): HeroFlankImages {
  const pool = urls.filter(Boolean);
  if (pool.length === 0) {
    return { left: [], right: [] };
  }

  const start = hashString(anchor) % pool.length;
  const pick = (offset: number) => pool[(start + offset) % pool.length] ?? pool[0];

  const collage = Array.from({ length: HERO_COLLAGE_COUNT }, (_, index) =>
    buildHeroFlankImageUrl(pick(index)),
  );

  const featuredSource = MARKETING_IMAGES.heroHalfBackground || pick(HERO_COLLAGE_COUNT);
  return {
    left: collage,
    right: [buildHeroFeaturedImageUrl(featuredSource)],
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
