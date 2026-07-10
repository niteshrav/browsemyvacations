import { collectHeroTourismPhotoUrls } from "@bmv/shared";

export const HERO_FLANK_IMAGE_COUNT_PER_SIDE = 3;

export type HeroFlankImages = {
  left: string[];
  right: string[];
};

export function heroStageClassName(): string {
  return "relative mx-auto flex w-full max-w-[1400px] items-stretch gap-5 lg:gap-7 xl:gap-10";
}

export function heroFlankPanelClassName(side: "left" | "right"): string {
  const align = side === "left" ? "items-end" : "items-start";
  return `hidden lg:flex w-44 xl:w-56 shrink-0 flex-col justify-center gap-5 ${align}`;
}

export function heroFlankPanelHiddenClassName(): string {
  return "hidden";
}

export function heroFlankImageClassName(): string {
  return "group relative h-32 w-full overflow-hidden rounded-2xl border border-stone-200/80 shadow-md transition-shadow duration-500 hover:border-teal-200/90 hover:shadow-xl";
}

export function hashString(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function buildHeroFlankImageUrl(fullUrl: string): string {
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=400&h=460&q=85");
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

/** Stagger flank thumbnails like the reference collage layout. */
export function heroFlankImageOffsetClassName(index: number, side: "left" | "right"): string {
  const leftOffsets = ["translate-x-3", "-translate-x-1", "translate-x-2"];
  const rightOffsets = ["-translate-x-3", "translate-x-1", "-translate-x-2"];
  const offsets = side === "left" ? leftOffsets : rightOffsets;
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
  const needed = HERO_FLANK_IMAGE_COUNT_PER_SIDE * 2;

  const picks = Array.from({ length: needed }, (_, index) => pick(index)).map(buildHeroFlankImageUrl);

  return {
    left: picks.slice(0, HERO_FLANK_IMAGE_COUNT_PER_SIDE),
    right: picks.slice(HERO_FLANK_IMAGE_COUNT_PER_SIDE, needed),
  };
}

export function shuffleHeroFlankImages(anchor: string, salt: number): HeroFlankImages {
  return selectHeroFlankImages(collectHeroTourismPhotoUrls(), `${anchor}:${salt}`);
}

export function getHeroFlankImages(anchor: string): HeroFlankImages {
  return selectHeroFlankImages(collectHeroTourismPhotoUrls(), anchor);
}
