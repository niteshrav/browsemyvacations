import { Test, TestingModule } from "@nestjs/testing";
import { MeterService } from "./meter.service";
import { PrismaService } from "../prisma/prisma.service";

describe("MeterService", () => {
  let service: MeterService;
  const prismaMock = {
    meterConfig: { findFirst: jest.fn() },
    meterSession: { create: jest.fn() },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    prismaMock.$transaction.mockImplementation(async (fn: (tx: typeof prismaMock) => unknown) =>
      fn(prismaMock),
    );
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeterService, { provide: PrismaService, useValue: { client: prismaMock } }],
    }).compile();
    service = module.get(MeterService);
  });

  it("calculate persists session and returns estimate", async () => {
    prismaMock.meterConfig.findFirst.mockResolvedValue({
      id: "cfg-1",
      currency: "INR",
      disclaimer: "Indicative only.",
      outputMode: "range",
      destinationRates: [
        {
          baseRatePerNight: { toString: () => "8000" },
          destination: { id: "d1", name: "Udaipur", slug: "udaipur", active: true },
        },
      ],
      vehicleTiers: [{ name: "Sedan", multiplier: { toString: () => "1" } }],
    });
    prismaMock.meterSession.create.mockResolvedValue({ id: "session-1" });

    const result = await service.calculate({
      destinationSlugs: ["udaipur"],
      totalNights: 3,
      pickupTime: "09:00",
      dropoffTime: "18:00",
      travelDate: "2026-08-01",
      vehicleTierName: "Sedan",
      adults: 2,
      children: 0,
      pacing: "moderate",
    });

    expect(result.sessionId).toBe("session-1");
    expect(result.estimateMin).toBeDefined();
    expect(result.feasibility.feasibilityScore).toBeGreaterThan(0);
    expect(prismaMock.meterSession.create).toHaveBeenCalled();
  });
});
