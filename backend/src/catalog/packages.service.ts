import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { CreatePackageInput, UpdatePackageInput } from "@bmv/shared";
import {
  deliverCdnImageUrl,
  findRajasthanCityBySlug,
  packageMatchesCityFilter,
  resolvePackageOverviewContent,
  slugifyPackageTitle,
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

function asStringArray(value: Prisma.JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asFaqArray(value: Prisma.JsonValue): Array<{ question: string; answer: string }> {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null;
      const record = item as Record<string, unknown>;
      const question = typeof record.question === "string" ? record.question : "";
      const answer = typeof record.answer === "string" ? record.answer : "";
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is { question: string; answer: string } => item !== null);
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
  discountPrice: true,
  priceIsFixed: true,
  currency: true,
  images: true,
  coverImage: true,
  featured: true,
  popular: true,
  active: true,
  status: true,
} satisfies Prisma.PackageSelect;

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async listPublic(params?: { destinationSlug?: string }) {
    const where: Prisma.PackageWhereInput = { active: true, status: "published" };

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
      where: { slug, active: true, status: "published" },
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

  async adminStats() {
    const [total, published, draft, featured, recent] = await Promise.all([
      this.prisma.client.package.count(),
      this.prisma.client.package.count({ where: { status: "published" } }),
      this.prisma.client.package.count({ where: { status: "draft" } }),
      this.prisma.client.package.count({ where: { featured: true } }),
      this.prisma.client.package.findMany({
        take: 8,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          active: true,
          featured: true,
          updatedAt: true,
        },
      }),
    ]);

    return { total, published, draft, featured, recent };
  }

  async findByIdOrThrow(id: string, tx: Prisma.TransactionClient = this.prisma.client) {
    const row = await tx.package.findUnique({
      where: { id },
      include: {
        destinations: { include: { destination: { select: { id: true, name: true, slug: true } } } },
        itineraryDays: { orderBy: { dayNumber: "asc" } },
      },
    });
    if (!row) throw new NotFoundException("Package not found");
    return row;
  }

  async create(input: CreatePackageInput) {
    const {
      destinationIds,
      itineraryDays,
      priceFrom,
      discountPrice,
      images,
      highlights,
      inclusions,
      exclusions,
      whyBook,
      activities,
      faq,
      ...rest
    } = input;

    try {
      return await this.prisma.client.$transaction(async (tx) => {
        const pkg = await tx.package.create({
          data: {
            ...rest,
            priceFrom,
            discountPrice: discountPrice ?? null,
            images: images ?? [],
            highlights: highlights ?? [],
            inclusions: inclusions ?? [],
            exclusions: exclusions ?? [],
            whyBook: whyBook ?? [],
            activities: activities ?? [],
            faq: faq ?? [],
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
      data: {
        images,
        coverImage: row.coverImage ?? imageUrl,
      },
    });
    return this.findByIdOrThrow(id);
  }

  async removeImage(id: string, imageUrl: string) {
    const row = await this.findByIdOrThrow(id);
    const images = (Array.isArray(row.images) ? (row.images as string[]) : []).filter(
      (url) => url !== imageUrl,
    );
    const coverImage =
      row.coverImage === imageUrl ? (images[0] ?? null) : (row.coverImage ?? null);
    await this.prisma.client.package.update({
      where: { id },
      data: { images, coverImage },
    });
    return this.findByIdOrThrow(id);
  }

  async duplicate(id: string) {
    const src = await this.findByIdOrThrow(id);
    const baseSlug = slugifyPackageTitle(`${src.slug}-copy`) || `${src.slug}-copy`;
    let slug = baseSlug;
    let n = 2;
    while (await this.prisma.client.package.findUnique({ where: { slug }, select: { id: true } })) {
      slug = `${baseSlug}-${n++}`;
    }

    const citiesFallback =
      src.destinations.map((d) => d.destination.name).filter(Boolean).length > 0
        ? src.destinations.map((d) => d.destination.name)
        : ["Destination"];

    return this.create({
      title: `${src.title} (Copy)`,
      slug,
      categorySlug: src.categorySlug,
      categoryName: src.categoryName,
      displayOrder: src.displayOrder,
      durationDays: src.durationDays,
      durationNights: src.durationNights,
      shortDescription: src.shortDescription,
      priceFrom: decimalToNumber(src.priceFrom),
      discountPrice: src.discountPrice ? decimalToNumber(src.discountPrice) : null,
      priceIsFixed: src.priceIsFixed,
      currency: src.currency,
      images: asStringArray(src.images),
      coverImage: src.coverImage,
      highlights: asStringArray(src.highlights),
      inclusions: asStringArray(src.inclusions),
      exclusions: asStringArray(src.exclusions),
      whyBook: asStringArray(src.whyBook),
      hotelDetails: src.hotelDetails,
      mealPlan: src.mealPlan,
      transportDetails: src.transportDetails,
      activities: asStringArray(src.activities),
      cancellationPolicy: src.cancellationPolicy,
      termsAndConditions: src.termsAndConditions,
      faq: asFaqArray(src.faq),
      pickupLocation: src.pickupLocation,
      dropLocation: src.dropLocation,
      seoTitle: src.seoTitle,
      seoDescription: src.seoDescription,
      status: "draft",
      featured: false,
      popular: false,
      active: true,
      destinationIds: src.destinations.map((d) => d.destinationId),
      itineraryDays:
        src.itineraryDays.length > 0
          ? src.itineraryDays.map((d) => ({
              dayNumber: d.dayNumber,
              title: d.title,
              cities: asStringArray(d.cities).length > 0 ? asStringArray(d.cities) : citiesFallback,
              summary: d.summary,
            }))
          : [
              {
                dayNumber: 1,
                title: "Arrival",
                cities: citiesFallback,
                summary: src.shortDescription,
              },
            ],
    });
  }

  async update(id: string, input: UpdatePackageInput) {
    await this.findByIdOrThrow(id);
    const {
      destinationIds,
      itineraryDays,
      priceFrom,
      discountPrice,
      images,
      highlights,
      inclusions,
      exclusions,
      whyBook,
      activities,
      faq,
      ...rest
    } = input;

    try {
      return await this.prisma.client.$transaction(async (tx) => {
        await tx.package.update({
          where: { id },
          data: {
            ...rest,
            ...(priceFrom !== undefined ? { priceFrom } : {}),
            ...(discountPrice !== undefined ? { discountPrice } : {}),
            ...(images !== undefined ? { images } : {}),
            ...(highlights !== undefined ? { highlights } : {}),
            ...(inclusions !== undefined ? { inclusions } : {}),
            ...(exclusions !== undefined ? { exclusions } : {}),
            ...(whyBook !== undefined ? { whyBook } : {}),
            ...(activities !== undefined ? { activities } : {}),
            ...(faq !== undefined ? { faq } : {}),
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
      discountPrice?: Prisma.Decimal | null;
      priceIsFixed: boolean;
      currency: string;
      images: Prisma.JsonValue;
      coverImage?: string | null;
      featured?: boolean;
      popular?: boolean;
    },
    destinationSlugs: string[] = [],
  ) {
    const images = deliverPackageImages(row.images);
    const cover = row.coverImage
      ? deliverCdnImageUrl(row.coverImage, { width: 1200, crop: "fill" })
      : images[0];
    const orderedImages = cover
      ? [cover, ...images.filter((url) => url !== cover)]
      : images;

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
        discount: row.discountPrice ? decimalToNumber(row.discountPrice) : null,
        isFixed: row.priceIsFixed,
        currency: row.currency,
      },
      images: orderedImages,
      coverImage: cover ?? null,
      featured: row.featured ?? false,
      popular: row.popular ?? false,
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
    discountPrice: Prisma.Decimal | null;
    priceIsFixed: boolean;
    currency: string;
    images: Prisma.JsonValue;
    coverImage: string | null;
    highlights: Prisma.JsonValue;
    inclusions: Prisma.JsonValue;
    exclusions: Prisma.JsonValue;
    whyBook: Prisma.JsonValue;
    hotelDetails: string | null;
    mealPlan: string | null;
    transportDetails: string | null;
    activities: Prisma.JsonValue;
    cancellationPolicy: string | null;
    termsAndConditions: string | null;
    faq: Prisma.JsonValue;
    pickupLocation: string | null;
    dropLocation: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    featured: boolean;
    popular: boolean;
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
      details: {
        whyBook: asStringArray(row.whyBook),
        hotelDetails: row.hotelDetails,
        mealPlan: row.mealPlan,
        transportDetails: row.transportDetails,
        activities: asStringArray(row.activities),
        cancellationPolicy: row.cancellationPolicy,
        termsAndConditions: row.termsAndConditions,
        faq: asFaqArray(row.faq),
        pickupLocation: row.pickupLocation,
        dropLocation: row.dropLocation,
      },
      seo: {
        title: row.seoTitle,
        description: row.seoDescription,
      },
      destinations: row.destinations.map((d) => d.destination),
      itinerary,
    };
  }

  private isUniqueViolation(e: unknown): boolean {
    return typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2002";
  }
}
