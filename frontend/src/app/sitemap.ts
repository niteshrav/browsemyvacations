import type { MetadataRoute } from "next";
import { fetchPackages } from "@/lib/catalog-api";
import { buildSitemapEntries, type SitemapEntryInput } from "@/lib/sitemap-entries";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES: SitemapEntryInput[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/packages", changeFrequency: "daily", priority: 0.9 },
  { path: "/search", changeFrequency: "weekly", priority: 0.5 },
  { path: "/vacation-meter", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/mice", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packages = await fetchPackages();
  const entries = buildSitemapEntries(
    getSiteUrl(),
    STATIC_ROUTES,
    packages.map((p) => p.slug),
  );

  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified ?? new Date(),
    changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: entry.priority,
  }));
}
