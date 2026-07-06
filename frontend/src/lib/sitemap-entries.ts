export type SitemapEntryInput = {
  path: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export function buildSitemapEntries(
  siteUrl: string,
  staticRoutes: SitemapEntryInput[],
  packageSlugs: string[],
): Array<{ url: string; lastModified?: Date; changeFrequency?: string; priority?: number }> {
  const base = siteUrl.replace(/\/$/, "");
  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route.path.startsWith("/") ? route.path : `/${route.path}`}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const packageEntries = packageSlugs.map((slug) => ({
    url: `${base}/packages/${encodeURIComponent(slug)}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticEntries, ...packageEntries];
}
