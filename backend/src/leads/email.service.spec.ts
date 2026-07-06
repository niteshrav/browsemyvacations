import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailService } from "./email.service";
import { PrismaService } from "../prisma/prisma.service";

describe("EmailService", () => {
  let service: EmailService;
  const prismaMock = {
    lead: { findUnique: jest.fn(), update: jest.fn() },
  };
  const configMock = {
    get: jest.fn((key: string, defaultValue?: string) => {
      if (key === "RESEND_API_KEY") return "";
      if (key === "OPS_EMAIL_TO") return "ops@test.com";
      return defaultValue;
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: PrismaService, useValue: { client: prismaMock } },
        { provide: ConfigService, useValue: configMock },
      ],
    }).compile();
    service = module.get(EmailService);
  });

  it("skips send when Resend is not configured", async () => {
    prismaMock.lead.findUnique.mockResolvedValue({
      id: "l1",
      fullName: "Test",
      email: "t@example.com",
      phone: "9876543210",
      source: "contact",
      package: null,
      travelDate: null,
      startCity: null,
      endCity: null,
      persons: null,
      rooms: null,
      vehiclePreference: null,
      message: null,
    });
    prismaMock.lead.update.mockResolvedValue({});

    const sent = await service.sendLeadAlert("l1");
    expect(sent).toBe(false);
    expect(prismaMock.lead.update).toHaveBeenCalled();
  });
});
