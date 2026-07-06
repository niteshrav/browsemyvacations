import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { DestinationsService } from "./destinations.service";

describe("DestinationsService", () => {
  let service: DestinationsService;
  const prisma = {
    destination: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinationsService, { provide: PrismaService, useValue: { client: prisma } }],
    }).compile();
    service = module.get(DestinationsService);
  });

  it("lists active destinations ordered by displayOrder", async () => {
    prisma.destination.findMany.mockResolvedValue([{ id: "1", name: "Udaipur", slug: "udaipur" }]);
    const result = await service.listPublic();
    expect(result).toHaveLength(1);
    expect(prisma.destination.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { active: true } }),
    );
  });

  it("throws NotFound when destination missing", async () => {
    prisma.destination.findUnique.mockResolvedValue(null);
    await expect(service.findByIdOrThrow("missing")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("maps Prisma P2002 to ConflictException on create", async () => {
    prisma.destination.create.mockRejectedValue({ code: "P2002" });
    await expect(
      service.create({ name: "X", slug: "x", displayOrder: 0, active: true }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
