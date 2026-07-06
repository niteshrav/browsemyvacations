import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { SuggestionsService } from "./suggestions.service";

describe("SuggestionsService", () => {
  let service: SuggestionsService;
  const prismaMock = {
    suggestion: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestionsService, { provide: PrismaService, useValue: { client: prismaMock } }],
    }).compile();
    service = module.get(SuggestionsService);
  });

  it("maps public suggestions with destination slug", async () => {
    prismaMock.suggestion.findMany.mockResolvedValue([
      {
        id: "s1",
        label: "Udaipur",
        type: "destination",
        action: "filter",
        destination: { slug: "udaipur" },
        package: null,
      },
    ]);

    const result = await service.listPublic();
    expect(result).toEqual([
      {
        id: "s1",
        label: "Udaipur",
        type: "destination",
        action: "filter",
        destinationSlug: "udaipur",
        packageSlug: null,
      },
    ]);
  });
});
