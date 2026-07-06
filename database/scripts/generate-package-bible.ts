/**
 * Parses Package Bible 2.pdf into shared seed catalog TypeScript.
 * Run: pnpm --filter @bmv/database generate:package-bible
 */
import fs from "node:fs";
import path from "node:path";
import pdf from "pdf-parse";

const PDF_PATH = path.resolve(__dirname, "../../Package Bible 2.pdf");
const OUT_PATH = path.resolve(__dirname, "../../shared/src/seed/package-bible-catalog.ts");

const CATEGORY_PATTERNS = [
  {
    number: 1,
    slug: "standalone-single-city",
    name: "Standalone Single-City Escapes",
    header: /Category\s*1:\s*Standalone Single-City Escapes/i,
  },
  {
    number: 2,
    slug: "dual-city-combinations",
    name: "Dual-City Short Combinations",
    header: /Category\s*2:\s*Dual-City Short Combinations/i,
  },
  {
    number: 3,
    slug: "three-city-circuits",
    name: "Three-City Triangular Circuits",
    header: /Category\s*3:\s*Three-City Triangular Circuits/i,
  },
  {
    number: 4,
    slug: "regional-deep-dives",
    name: "Complete Regional Deep Dives",
    header: /Category\s*4:\s*Complete Regional Deep Dives/i,
  },
] as const;

const CITY_ALIASES: Record<string, string> = {
  "abu road": "Mount Abu",
  "sawai madhopur": "Sawai Madhopur",
  "jawai bandh": "Jawai",
  jawai: "Jawai",
  ranthambore: "Sawai Madhopur",
  sariska: "Alwar",
  bhangarh: "Alwar",
  eklingji: "Nathdwara",
  haldighati: "Chittorgarh",
  amer: "Amer",
  "tanot mata": "Jaisalmer",
  "bada bagh": "Jaisalmer",
  kuldhara: "Jaisalmer",
};

const KNOWN_CITIES = [
  "Mount Abu",
  "Sawai Madhopur",
  "Kumbhalgarh",
  "Chittorgarh",
  "Nathdwara",
  "Jaisalmer",
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Pushkar",
  "Bikaner",
  "Jawai",
  "Alwar",
  "Ajmer",
  "Ranakpur",
  "Amer",
];

type ParsedPackage = {
  categoryNumber: number;
  categorySlug: string;
  categoryName: string;
  packageNumber: number;
  title: string;
  durationDays: number;
  durationNights: number;
  shortDescription: string;
  destinations: string[];
  itinerary: Array<{ dayNumber: number; title: string; cities: string[]; summary: string }>;
};

function normalizeText(text: string): string {
  return text
    .replace(/\$\s*\\rightarrow\s*\$/g, "->")
    .replace(/\\rightarrow/g, "->")
    .replace(/\u2192/g, "->")
    .replace(/[–—]/g, "-");
}

function normalizeLine(line: string): string {
  return normalizeText(line).replace(/\s+/g, " ").trim();
}

function parseDuration(raw: string): { days: number; nights: number } | null {
  const dn = raw.match(/^(\d+)D\/(\d+)N$/i);
  if (dn) return { days: Number(dn[1]), nights: Number(dn[2]) };
  const nd = raw.match(/^(\d+)N\/(\d+)D$/i);
  if (nd) return { days: Number(nd[2]), nights: Number(nd[1]) };
  return null;
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/^\d+d\/\d+n\s+|\d+n\/\d+d\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base.slice(0, 80);
}

function extractCitiesFromTitle(title: string): string[] {
  const beforeColon = title.replace(/^\d+[DN]\/\d+[DN]\s+/i, "");
  const cityPart = beforeColon.split(":")[0] ?? beforeColon;
  const found = new Set<string>();

  for (const segment of cityPart.split(/\s*\+\s*/)) {
    const trimmed = segment.trim();
    const mapped =
      CITY_ALIASES[trimmed.toLowerCase()] ??
      KNOWN_CITIES.find((c) => c.toLowerCase() === trimmed.toLowerCase());
    if (mapped) found.add(mapped);
  }

  return [...found];
}

function extractCitiesFromText(text: string): string[] {
  const fromTitle = extractCitiesFromTitle(text);
  if (fromTitle.length > 0) return fromTitle;

  const found = new Set<string>();
  const lower = text.toLowerCase();

  for (const [alias, canonical] of Object.entries(CITY_ALIASES)) {
    if (lower.includes(alias)) found.add(canonical);
  }
  for (const city of KNOWN_CITIES) {
    if (lower.includes(city.toLowerCase())) found.add(city);
  }

  const parenMatch = text.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const segment = parenMatch[1] ?? "";
    if (segment.toLowerCase().includes(" to ")) {
      for (const part of segment.split(/\s+to\s+/i)) {
        const city = part.replace(/departure/i, "").trim();
        const mapped = CITY_ALIASES[city.toLowerCase()] ?? KNOWN_CITIES.find((c) => c.toLowerCase() === city.toLowerCase());
        if (mapped) found.add(mapped);
      }
    } else {
      const city = segment.replace(/departure/i, "").trim();
      const mapped = CITY_ALIASES[city.toLowerCase()] ?? KNOWN_CITIES.find((c) => c.toLowerCase() === city.toLowerCase());
      if (mapped) found.add(mapped);
    }
  }

  return [...found];
}

function parseItineraryDays(block: string): ParsedPackage["itinerary"] {
  const itinerary: ParsedPackage["itinerary"] = [];
  const dayChunks = block.split(/●\s*Day\s+/i).slice(1);

  for (const chunk of dayChunks) {
    const lines = chunk
      .split("\n")
      .map((line) => normalizeLine(line.replace(/^●\s*/, "")))
      .filter(Boolean);
    const first = lines[0] ?? "";
    const match = first.match(/^(\d+)\s*(?:\(([^)]+)\))?\s*[:：]\s*(.*)$/i);
    if (!match) continue;

    const dayNumber = Number(match[1]);
    const location = match[2]?.trim() || `Day ${dayNumber}`;
    const summaryParts = [match[3] ?? "", ...lines.slice(1)].filter(Boolean);
    const summary = normalizeLine(summaryParts.join(" "));

    const cities =
      extractCitiesFromText(location).length > 0
        ? extractCitiesFromText(location)
        : extractCitiesFromText(summary);

    itinerary.push({
      dayNumber,
      title: location,
      cities: cities.length > 0 ? cities : ["Jaipur"],
      summary: summary || shortDescriptionFallback(location),
    });
  }

  return itinerary;
}

function shortDescriptionFallback(text: string): string {
  return `Explore ${text} with curated sightseeing, comfortable stays, and local experiences.`;
}

function parseWhyBookThis(block: string): string {
  const match = block.match(/Why Book This:\s*([\s\S]*?)(?=\n●\s*Day\s+\d+|\n\d+\.\s+\d+[DN]\/)/i);
  if (!match) return "";
  return normalizeLine(match[1] ?? "");
}

function parsePackagesFromSection(
  sectionText: string,
  category: (typeof CATEGORY_PATTERNS)[number],
): ParsedPackage[] {
  const packages: ParsedPackage[] = [];
  const blocks = sectionText.split(/\n(?=\d+\.\s+\d+[DN]\/\d+[DN])/);

  for (const block of blocks) {
    const titleMatch = block.match(
      /^\d+\.\s+((\d+D\/\d+N|\d+N\/\d+D)\s+[^:]+(?::[^\n●]+)?)/im,
    );
    if (!titleMatch) continue;

    const fullTitle = normalizeLine(titleMatch[1] ?? "");
    const durationRaw = titleMatch[2] ?? "";
    const duration = parseDuration(durationRaw);
    if (!duration) continue;

    const whyMatch = parseWhyBookThis(block);
    const shortDescription = whyMatch || fullTitle;

    const itinerary = parseItineraryDays(block);

    const packageNumber = Number(block.match(/^(\d+)\./)?.[1] ?? packages.length + 1);
    const destinations = extractCitiesFromText(fullTitle);
    for (const day of itinerary) {
      for (const city of day.cities) destinations.push(city);
    }
    const uniqueDestinations = [...new Set(destinations)];

    packages.push({
      categoryNumber: category.number,
      categorySlug: category.slug,
      categoryName: category.name,
      packageNumber,
      title: fullTitle,
      durationDays: duration.days,
      durationNights: duration.nights,
      shortDescription,
      destinations: uniqueDestinations.length > 0 ? uniqueDestinations : ["Jaipur"],
      itinerary:
        itinerary.length > 0
          ? itinerary
          : [
              {
                dayNumber: 1,
                title: "Day 1",
                cities: uniqueDestinations.slice(0, 1),
                summary: shortDescription,
              },
            ],
    });
  }

  return packages;
}

function splitByCategories(text: string): ParsedPackage[] {
  const categoryRegex = /Category\s*([1-4]):\s*([^\n(]+)/gi;
  const matches = [...text.matchAll(categoryRegex)];
  const all: ParsedPackage[] = [];

  for (let i = 0; i < matches.length; i += 1) {
    const number = Number(matches[i]![1]);
    const category = CATEGORY_PATTERNS.find((c) => c.number === number);
    if (!category) continue;
    const start = matches[i]!.index ?? 0;
    const end = i + 1 < matches.length ? (matches[i + 1]!.index ?? text.length) : text.length;
    const section = text.slice(start, end);
    all.push(...parsePackagesFromSection(section, category));
  }

  return all;
}

function estimatePrice(nights: number, categoryNumber: number): number {
  const base = 8900 + nights * 4200 + categoryNumber * 1500;
  return Math.round(base / 100) * 100;
}

function assignImages(destinations: string[]): string[] {
  const lower = destinations.map((d) => d.toLowerCase());
  if (lower.some((d) => d.includes("udaipur"))) {
    return ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"];
  }
  if (lower.some((d) => d.includes("jaipur"))) {
    return ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"];
  }
  if (lower.some((d) => d.includes("jodhpur") || d.includes("jaisalmer") || d.includes("bikaner"))) {
    return ["https://images.unsplash.com/photo-1602643454724-21d5a40722db?auto=format&fit=crop&w=1200&q=80"];
  }
  return ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"];
}

function emitCatalog(packages: ParsedPackage[]): string {
  const slugCounts = new Map<string, number>();
  const records = packages.map((pkg, index) => {
    let slug = `${pkg.categorySlug}-${slugify(pkg.title)}`;
    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count + 1}`;

    return {
      ...pkg,
      slug,
      displayOrder: index + 1,
      priceFrom: estimatePrice(pkg.durationNights, pkg.categoryNumber),
      images: assignImages(pkg.destinations),
    };
  });

  return `/** Auto-generated from Package Bible 2.pdf — do not edit by hand. */\n\nexport const PACKAGE_BIBLE_CATEGORIES = ${JSON.stringify(
    CATEGORY_PATTERNS.map((c) => ({
      number: c.number,
      slug: c.slug,
      name: c.name,
      packageCount: records.filter((r) => r.categorySlug === c.slug).length,
    })),
    null,
    2,
  )} as const;\n\nexport type PackageBibleCategorySlug = (typeof PACKAGE_BIBLE_CATEGORIES)[number]["slug"];\n\nexport type PackageBibleSeedPackage = {\n  categoryNumber: number;\n  categorySlug: PackageBibleCategorySlug;\n  categoryName: string;\n  packageNumber: number;\n  displayOrder: number;\n  title: string;\n  slug: string;\n  durationDays: number;\n  durationNights: number;\n  shortDescription: string;\n  priceFrom: number;\n  images: string[];\n  destinations: string[];\n  itinerary: Array<{ dayNumber: number; title: string; cities: string[]; summary: string }>;\n};\n\nexport const PACKAGE_BIBLE_CATALOG: PackageBibleSeedPackage[] = ${JSON.stringify(records, null, 2)};\n`;
}

async function main() {
  const buffer = fs.readFileSync(PDF_PATH);
  const parsed = await pdf(buffer);
  const text = normalizeText(parsed.text.replace(/\r/g, "\n"));
  const packages = splitByCategories(text);

  if (packages.length < 90) {
    console.error(`Expected ~101 packages, parsed ${packages.length}`);
    process.exit(1);
  }

  fs.writeFileSync(OUT_PATH, emitCatalog(packages));
  console.log(`Wrote ${packages.length} packages to ${OUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
