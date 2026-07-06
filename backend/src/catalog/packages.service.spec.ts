import type { CreatePackageInput } from "@bmv/shared";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { PackagesService } from "./packages.service";

describe("PackagesService", () => {
  let service: PackagesService;
  const prismaMock = {
    package: { findMany: jest.fn(), findFirst: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
    itineraryDay: { deleteMany: jest.fn(), createMany: jest.fn() },
    packageDestination: { createMany: jest.fn(), deleteMany: jest.fn() },
    destination: { findFirst: jest.fn() },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    prismaMock.$transaction.mockImplementation(async (fn: (tx: typeof prismaMock) => Promise<unknown>) =>
      fn(prismaMock),
    );
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagesService, { provide: PrismaService, useValue: { client: prismaMock } }],
    }).compile();
    service = module.get(PackagesService);
  });

  it("returns null when package slug not found", async () => {
    prismaMock.package.findFirst.mockResolvedValue(null);
    const result = await service.findPublicBySlug("missing");
    expect(result).toBeNull();
  });

  it("filters packages by destination slug with strict city matching", async () => {
    prismaMock.destination.findFirst.mockResolvedValue({ id: "d1", slug: "udaipur", active: true });
    prismaMock.package.findMany.mockResolvedValue([
      {
        id: "1",
        title: "2D/1N Udaipur: The Romantic Lake Escape",
        slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
        categorySlug: "standalone-single-city",
        categoryName: "Standalone Single-City Escapes",
        displayOrder: 1,
        durationDays: 2,
        durationNights: 1,
        shortDescription: "Desc",
        priceFrom: 10000,
        priceIsFixed: false,
        currency: "INR",
        images: [],
        destinations: [{ destination: { slug: "udaipur" } }],
      },
      {
        id: "2",
        title: "2D/1N Kumbhalgarh: The Great Wall of India Trek",
        slug: "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
        categorySlug: "standalone-single-city",
        categoryName: "Standalone Single-City Escapes",
        displayOrder: 2,
        durationDays: 2,
        durationNights: 1,
        shortDescription: "Desc",
        priceFrom: 12000,
        priceIsFixed: false,
        currency: "INR",
        images: [],
        destinations: [
          { destination: { slug: "kumbhalgarh" } },
          { destination: { slug: "udaipur" } },
        ],
      },
    ]);

    const result = await service.listPublic({ destinationSlug: "udaipur" });
    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("standalone-single-city-udaipur-the-romantic-lake-escape");
    expect(result[0]?.destinationSlugs).toEqual(["udaipur"]);
  });

  it("includes destination slugs on public package cards", async () => {
    prismaMock.package.findMany.mockResolvedValue([
      {
        id: "1",
        title: "2D/1N Udaipur: The Romantic Lake Escape",
        slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
        categorySlug: "standalone-single-city",
        categoryName: "Standalone Single-City Escapes",
        displayOrder: 1,
        durationDays: 2,
        durationNights: 1,
        shortDescription: "Desc",
        priceFrom: 10000,
        priceIsFixed: false,
        currency: "INR",
        images: [],
        destinations: [
          { destination: { slug: "udaipur" } },
          { destination: { slug: "jaipur" } },
        ],
      },
    ]);

    const result = await service.listPublic();
    expect(result[0]?.destinationSlugs).toEqual(["udaipur", "jaipur"]);
  });

  it("throws when admin update target missing", async () => {
    prismaMock.package.findUnique.mockResolvedValue(null);
    await expect(service.update("id", { title: "New" })).rejects.toBeInstanceOf(NotFoundException);
  });

  it("create returns package loaded inside the same transaction", async () => {
    const created = { id: "pkg-1", slug: "new-pkg", title: "New" };
    prismaMock.package.create.mockResolvedValue(created);
    prismaMock.package.findUnique.mockResolvedValue({
      ...created,
      destinations: [],
      itineraryDays: [],
    });

    const input: CreatePackageInput = {
      title: "New",
      slug: "new-pkg",
      categorySlug: "custom",
      categoryName: "Custom Packages",
      displayOrder: 0,
      durationDays: 2,
      durationNights: 1,
      shortDescription: "Desc",
      priceFrom: 10000,
      priceIsFixed: false,
      currency: "INR",
      images: [],
      highlights: [],
      inclusions: [],
      exclusions: [],
      active: true,
      destinationIds: ["d1"],
      itineraryDays: [{ dayNumber: 1, title: "Day 1", cities: ["City"], summary: "Sum" }],
    };
    const result = await service.create(input);

    expect(result.id).toBe("pkg-1");
    expect(prismaMock.package.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "pkg-1" } }),
    );
  });
});
