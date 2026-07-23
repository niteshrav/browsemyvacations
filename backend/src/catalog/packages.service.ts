import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { CreatePackageInput, UpdatePackageInput } from "@bmv/shared";
import {
  deliverCdnImageUrl,
  findRajasthanCityBySlug,
  packageMatchesCityFilter,
  resolvePackageOverviewContent,
} from "@bmv/shared";
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
  categorySlug: true,
  categoryName: true,
  displayOrder: true,
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
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async listPublic(params?: { destinationSlug?: string }) {
    const where: Prisma.PackageWhereInput = { active: true };

    if (params?.destinationSlug) {
      const dest = await this.prisma.client.destination.findFirst({
        where: { slug: params.destinationSlug, active: true },
      });
      if (!dest) return [];
      where.destinations = { some: { destinationId: dest.id } };
    }

    const rows = await this.prisma.client.package.findMany({
      where,
      select: {
        ...packageCardSelect,
        destinations: { include: { destination: { select: { slug: true } } } },
      },
      orderBy: [{ displayOrder: "asc" }, { title: "asc" }],
    });

    const cityName = params?.destinationSlug
      ? findRajasthanCityBySlug(params.destinationSlug)
      : null;
    const destinationSlug = params?.destinationSlug;

    const filtered =
      cityName && destinationSlug
        ? rows.filter((row) =>
            packageMatchesCityFilter(
              {
                title: row.title,
                slug: row.slug,
                destinationSlugs: row.destinations.map((link) => link.destination.slug),
                itineraryCities: [],
              },
              destinationSlug,
              cityName,
            ),
          )
        : rows;

    return filtered.map((r) =>
      this.mapCard(
        r,
        r.destinations.map((link) => link.destination.slug),
      ),
    );
  }

  async findPublicBySlug(slug: string) {
    const row = await this.prisma.client.package.findFirst({
      where: { slug, active: true },
      include: {
        itineraryDays: { orderBy: { dayNumber: "asc" } },
        destinations: { include: { destination: true } },
      },
    });
    if (!row) return null;
    return this.mapDetail(row);
  }

  listAdmin() {
    return this.prisma.client.package.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        destinations: { include: { destination: { select: { id: true, name: true, slug: true } } } },
        itineraryDays: { orderBy: { dayNumber: "asc" } },
      },
    });
  }

  async findByIdOrThrow(id: string, tx: Prisma.TransactionClient = this.prisma.client) {
    const row = await tx.package.findUnique({
      where: { id },
      include: {
        destinations: true,
        itineraryDays: { orderBy: { dayNumber: "asc" } },
      },
    });
    if (!row) throw new NotFoundException("Package not found");
    return row;
  }

  async create(input: CreatePackageInput) {
    const { destinationIds, itineraryDays, priceFrom, images, highlights, inclusions, exclusions, ...rest } =
      input;

    try {
      return await this.prisma.client.$transaction(async (tx) => {
        const pkg = await tx.package.create({
          data: {
            ...rest,
            priceFrom,
            images: images ?? [],
            highlights: highlights ?? [],
            inclusions: inclusions ?? [],
            exclusions: exclusions ?? [],
          },
        });
        await tx.packageDestination.createMany({
          data: destinationIds.map((destinationId) => ({ packageId: pkg.id, destinationId })),
        });
        await tx.itineraryDay.createMany({
          data: itineraryDays.map((d) => ({
            packageId: pkg.id,
            dayNumber: d.dayNumber,
            title: d.title,
            cities: d.cities,
            summary: d.summary,
          })),
        });
        return this.findByIdOrThrow(pkg.id, tx);
      });
    } catch (e: unknown) {
      if (this.isUniqueViolation(e)) throw new ConflictException("Package slug already exists");
      throw e;
    }
  }

  async addImage(id: string, imageUrl: string) {
    const row = await this.findByIdOrThrow(id);
    const images = Array.isArray(row.images) ? [...(row.images as string[])] : [];
    if (!images.includes(imageUrl)) {
      images.push(imageUrl);
    }
    await this.prisma.client.package.update({
      where: { id },
      data: { images },
    });
    return this.findByIdOrThrow(id);
  }

  async update(id: string, input: UpdatePackageInput) {
    await this.findByIdOrThrow(id);
    const { destinationIds, itineraryDays, priceFrom, images, highlights, inclusions, exclusions, ...rest } =
      input;

    try {
      return await this.prisma.client.$transaction(async (tx) => {
        await tx.package.update({
          where: { id },
          data: {
            ...rest,
            ...(priceFrom !== undefined ? { priceFrom } : {}),
            ...(images !== undefined ? { images } : {}),
            ...(highlights !== undefined ? { highlights } : {}),
            ...(inclusions !== undefined ? { inclusions } : {}),
            ...(exclusions !== undefined ? { exclusions } : {}),
          },
        });

        if (destinationIds) {
          await tx.packageDestination.deleteMany({ where: { packageId: id } });
          await tx.packageDestination.createMany({
            data: destinationIds.map((destinationId) => ({ packageId: id, destinationId })),
          });
        }

        if (itineraryDays) {
          await tx.itineraryDay.deleteMany({ where: { packageId: id } });
          await tx.itineraryDay.createMany({
            data: itineraryDays.map((d) => ({
              packageId: id,
              dayNumber: d.dayNumber,
              title: d.title,
              cities: d.cities,
              summary: d.summary,
            })),
          });
        }

        return this.findByIdOrThrow(id, tx);
      });
    } catch (e: unknown) {
      if (this.isUniqueViolation(e)) throw new ConflictException("Package slug already exists");
      throw e;
    }
  }

  private mapCard(
    row: {
      id: string;
      title: string;
      slug: string;
      categorySlug: string;
      categoryName: string;
      displayOrder: number;
      durationDays: number;
      durationNights: number;
      shortDescription: string;
      priceFrom: Prisma.Decimal;
      priceIsFixed: boolean;
      currency: string;
      images: Prisma.JsonValue;
    },
    destinationSlugs: string[] = [],
  ) {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: {
        slug: row.categorySlug,
        name: row.categoryName,
      },
      displayOrder: row.displayOrder,
      duration: { days: row.durationDays, nights: row.durationNights },
      shortDescription: row.shortDescription,
      price: {
        display: decimalToNumber(row.priceFrom),
        isFixed: row.priceIsFixed,
        currency: row.currency,
      },
      images: deliverPackageImages(row.images),
      destinationSlugs,
    };
  }

  private mapDetail(row: {
    id: string;
    title: string;
    slug: string;
    categorySlug: string;
    categoryName: string;
    displayOrder: number;
    durationDays: number;
    durationNights: number;
    shortDescription: string;
    priceFrom: Prisma.Decimal;
    priceIsFixed: boolean;
    currency: string;
    images: Prisma.JsonValue;
    highlights: Prisma.JsonValue;
    inclusions: Prisma.JsonValue;
    exclusions: Prisma.JsonValue;
    itineraryDays: Array<{
      dayNumber: number;
      title: string;
      cities: Prisma.JsonValue;
      summary: string;
    }>;
    destinations: Array<{ destination: { id: string; name: string; slug: string } }>;
  }) {
    const card = this.mapCard(
      row,
      row.destinations.map((d) => d.destination.slug),
    );
    const itinerary = row.itineraryDays.map((d) => ({
      dayNumber: d.dayNumber,
      title: d.title,
      cities: Array.isArray(d.cities) ? (d.cities as string[]) : [],
      summary: d.summary,
    }));
    const destinationNames = row.destinations.map((d) => d.destination.name);
    const overviewContent = resolvePackageOverviewContent(
      {
        highlights: Array.isArray(row.highlights) ? (row.highlights as string[]) : [],
        inclusions: Array.isArray(row.inclusions) ? (row.inclusions as string[]) : [],
        exclusions: Array.isArray(row.exclusions) ? (row.exclusions as string[]) : [],
      },
      {
        title: row.title,
        durationDays: row.durationDays,
        durationNights: row.durationNights,
        shortDescription: row.shortDescription,
        destinations: destinationNames,
        itinerary,
      },
    );

    return {
      ...card,
      overview: {
        description: row.shortDescription,
        highlights: overviewContent.highlights,
        inclusions: overviewContent.inclusions,
        exclusions: overviewContent.exclusions,
        knowBeforeYouGo: overviewContent.knowBeforeYouGo,
        featureBadges: overviewContent.featureBadges,
      },
      destinations: row.destinations.map((d) => d.destination),
      itinerary,
    };
  }

  private isUniqueViolation(e: unknown): boolean {
    return typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2002";
  }
}
