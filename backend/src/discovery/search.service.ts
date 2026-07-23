import { Injectable } from "@nestjs/common";
import { deliverCdnImageUrl, packageMatchesSearchQuery, type SearchablePackage } from "@bmv/shared";
import { Prisma } from "@bmv/database";
import { PrismaService } from "../prisma/prisma.service";
import { decimalToNumber } from "../common/serialize";

function deliverPackageImages(images: Prisma.JsonValue): string[] {
  if (!Array.isArray(images)) return [];
  return images
    .filter((image): image is string => typeof image === "string" && image.trim().length > 0)
    .map((image) => deliverCdnImageUrl(image, { width: 1200, crop: "fill" }));
}

const packageCardSelect = {
  id: true,
  title: true,
  slug: true,
  durationDays: true,
  durationNights: true,
  shortDescription: true,
  priceFrom: true,
  priceIsFixed: true,
  currency: true,
  images: true,
  active: true,
} satisfies Prisma.PackageSelect;

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(rawQuery: string) {
    const query = rawQuery.trim();

    const rows = await this.prisma.client.package.findMany({
      where: { active: true },
      select: {
        ...packageCardSelect,
        destinations: { include: { destination: { select: { slug: true } } } },
        itineraryDays: { select: { cities: true } },
      },
      orderBy: { title: "asc" },
    });

    const searchable: Array<{ row: (typeof rows)[number]; meta: SearchablePackage }> = rows.map(
      (row) => ({
        row,
        meta: {
          title: row.title,
          slug: row.slug,
          destinationSlugs: row.destinations.map((d) => d.destination.slug),
          itineraryCities: row.itineraryDays.flatMap((day) =>
            Array.isArray(day.cities) ? (day.cities as string[]) : [],
          ),
        },
      }),
    );

    const matched = searchable
      .filter(({ meta }) => packageMatchesSearchQuery(meta, query))
      .map(({ row }) => this.mapCard(row));

    return { query, packages: matched };
  }

  private mapCard(row: {
    id: string;
    title: string;
    slug: string;
    durationDays: number;
    durationNights: number;
    shortDescription: string;
    priceFrom: Prisma.Decimal;
    priceIsFixed: boolean;
    currency: string;
    images: Prisma.JsonValue;
  }) {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      duration: { days: row.durationDays, nights: row.durationNights },
      shortDescription: row.shortDescription,
      price: {
        display: decimalToNumber(row.priceFrom),
        isFixed: row.priceIsFixed,
        currency: row.currency,
      },
      images: deliverPackageImages(row.images),
    };
  }
}
