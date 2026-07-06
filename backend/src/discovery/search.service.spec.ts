import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;
  const prismaMock = {
    package: { findMany: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService, { provide: PrismaService, useValue: { client: prismaMock } }],
    }).compile();
    service = module.get(SearchService);
  });

  it("returns packages matching city in itinerary", async () => {
    prismaMock.package.findMany.mockResolvedValue([
      {
        id: "1",
        title: "Udaipur Trip",
        slug: "standalone-single-city-udaipur-trip",
        durationDays: 3,
        durationNights: 2,
        shortDescription: "Desc",
        priceFrom: 10000,
        priceIsFixed: false,
        currency: "INR",
        images: [],
        destinations: [{ destination: { slug: "udaipur" } }],
        itineraryDays: [{ cities: ["Udaipur"] }],
      },
      {
        id: "2",
        title: "2D/1N Kumbhalgarh: The Great Wall of India Trek",
        slug: "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
        durationDays: 3,
        durationNights: 2,
        shortDescription: "Desc",
        priceFrom: 12000,
        priceIsFixed: false,
        currency: "INR",
        images: [],
        destinations: [
          { destination: { slug: "kumbhalgarh" } },
          { destination: { slug: "udaipur" } },
        ],
        itineraryDays: [{ cities: ["Kumbhalgarh", "Udaipur"] }],
      },
    ]);

    const result = await service.search("Udaipur");
    expect(result.query).toBe("Udaipur");
    expect(result.packages).toHaveLength(1);
    expect(result.packages[0]?.slug).toBe("standalone-single-city-udaipur-trip");
  });

  it("returns empty list when nothing matches", async () => {
    prismaMock.package.findMany.mockResolvedValue([]);
    const result = await service.search("Nowhere");
    expect(result.packages).toEqual([]);
  });
});
