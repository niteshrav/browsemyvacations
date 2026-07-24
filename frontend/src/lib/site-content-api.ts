import {
  HERO_HEADLINE_ACCENT as DEFAULT_ACCENT,
  HERO_HEADLINE_PRIMARY as DEFAULT_PRIMARY,
  HERO_SUPPORT as DEFAULT_SUPPORT,
} from "@/lib/hero-home-content";
import { getApiBaseUrl } from "@/lib/api";

export type HomeHeroCopy = {
  headlinePrimary: string;
  headlineAccent: string;
  support: string;
};

export async function loadHomeHeroCopy(): Promise<HomeHeroCopy> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/content`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("content unavailable");
    const data = (await res.json()) as Record<string, string>;
    return {
      headlinePrimary: data["home.hero.headline_primary"]?.trim() || DEFAULT_PRIMARY,
      headlineAccent: data["home.hero.headline_accent"]?.trim() || DEFAULT_ACCENT,
      support: data["home.hero.support"]?.trim() || DEFAULT_SUPPORT,
    };
  } catch {
    return {
      headlinePrimary: DEFAULT_PRIMARY,
      headlineAccent: DEFAULT_ACCENT,
      support: DEFAULT_SUPPORT,
    };
  }
}
