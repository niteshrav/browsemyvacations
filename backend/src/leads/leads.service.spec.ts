import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailService } from "./email.service";
import { LeadsService } from "./leads.service";
import { PrismaService } from "../prisma/prisma.service";

describe("LeadsService", () => {
  let service: LeadsService;
  const prismaMock = {
    package: { findFirst: jest.fn() },
    lead: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    leadNote: { create: jest.fn() },
  };
  const emailMock = { sendLeadAlert: jest.fn().mockResolvedValue(true) };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: PrismaService, useValue: { client: prismaMock } },
        { provide: EmailService, useValue: emailMock },
      ],
    }).compile();
    service = module.get(LeadsService);
  });

  it("creates lead and sends email notification", async () => {
    prismaMock.package.findFirst.mockResolvedValue({ id: "pkg-1", slug: "standalone-single-city-udaipur-the-romantic-lake-escape" });
    prismaMock.lead.create.mockResolvedValue({
      id: "lead-1",
      fullName: "Priya",
      email: "p@example.com",
      status: "new",
      source: "package_detail",
      createdAt: new Date(),
      package: { id: "pkg-1", title: "Gateway", slug: "standalone-single-city-udaipur-the-romantic-lake-escape" },
    });

    const result = await service.create({
      fullName: "Priya",
      email: "p@example.com",
      phone: "9876543210",
      source: "package_detail",
      packageSlug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      marketingConsent: false,
    });

    expect(result.id).toBe("lead-1");
    expect(emailMock.sendLeadAlert).toHaveBeenCalledWith("lead-1");
  });

  it("strips HTML from message on create", async () => {
    prismaMock.package.findFirst.mockResolvedValue(null);
    prismaMock.lead.create.mockResolvedValue({
      id: "lead-2",
      fullName: "Test",
      email: "t@example.com",
      status: "new",
      source: "contact",
      createdAt: new Date(),
      package: null,
    });

    await service.create({
      fullName: "Test",
      email: "t@example.com",
      phone: "9876543210",
      source: "contact",
      message: '<b>Hello</b><script>x</script>',
      marketingConsent: true,
    });

    expect(prismaMock.lead.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          message: "Hellox",
          marketingConsent: true,
        }),
      }),
    );
  });

  it("throws when package slug is invalid", async () => {
    prismaMock.package.findFirst.mockResolvedValue(null);
    await expect(
      service.create({
        fullName: "Priya",
        email: "p@example.com",
        phone: "9876543210",
        source: "package_detail",
        packageSlug: "missing",
        marketingConsent: false,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("exports CSV with header row", async () => {
    prismaMock.lead.findMany.mockResolvedValue([
      {
        id: "l1",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        status: "new",
        source: "contact",
        fullName: "Test User",
        email: "t@example.com",
        phone: "9876543210",
        package: null,
        travelDate: null,
        persons: null,
        rooms: null,
        marketingConsent: false,
      },
    ]);
    const csv = await service.exportCsv();
    expect(csv.startsWith("id,createdAt,status")).toBe(true);
    expect(csv).toContain("Test User");
  });
});
