import { collectHeroTourismPhotoUrls } from "@bmv/shared";

export const HERO_FLANK_IMAGE_COUNT_PER_SIDE = 3;

export type HeroFlankImages = {
  left: string[];
  right: string[];
};

export function heroStageClassName(): string {
  return "relative mx-auto flex w-full max-w-6xl items-stretch gap-4 lg:gap-6 xl:gap-8";
}

export function heroFlankPanelClassName(side: "left" | "right"): string {
  const align = side === "left" ? "items-end" : "items-start";
  return `hidden lg:flex w-36 xl:w-44 shrink-0 flex-col justify-center gap-3 ${align}`;
}

export function heroFlankPanelHiddenClassName(): string {
  return "hidden";
}

export function heroFlankImageClassName(): string {
  return "relative h-28 w-full overflow-hidden rounded-2xl border border-stone-200/80 shadow-md";
}

export function hashString(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function buildHeroFlankImageUrl(fullUrl: string): string {
  return fullUrl.replace(/\?.*$/, "?auto=format&fit=crop&w=320&h=360&q=80");
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
