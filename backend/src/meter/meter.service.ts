import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {
  calculateMeterEstimate,
  calculateVacationFeasibility,
  MeterCalculationError,
  type CalculateMeterInput,
  type UpdateMeterConfigInput,
} from "@bmv/shared";
import { Prisma } from "@bmv/database";
import { decimalToNumber } from "../common/serialize";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MeterService {
  constructor(private readonly prisma: PrismaService) {}

  async getOptions() {
    const config = await this.getActiveConfigOrThrow();
    return {
      disclaimer: config.disclaimer,
      destinations: config.destinationRates.map((r) => ({
        id: r.destination.id,
        name: r.destination.name,
        slug: r.destination.slug,
      })),
      vehicleTiers: config.vehicleTiers.map((t) => ({
        name: t.name,
        multiplier: decimalToNumber(t.multiplier),
      })),
    };
  }

  async calculate(input: CalculateMeterInput) {
    const config = await this.getActiveConfigOrThrow();
    const calculatorConfig = this.toCalculatorConfig(config);

    try {
      const estimate = calculateMeterEstimate(input, calculatorConfig);
      const feasibility = calculateVacationFeasibility({
        destinationSlugs: input.destinationSlugs,
        totalNights: input.totalNights,
        pickupTime: input.pickupTime,
        dropoffTime: input.dropoffTime,
        pacing: input.pacing,
        adults: input.adults,
        children: input.children,
      });
      const session = await this.prisma.client.meterSession.create({
        data: {
          input: input as unknown as Prisma.InputJsonValue,
          output: { ...estimate, feasibility } as unknown as Prisma.InputJsonValue,
        },
      });
      return { sessionId: session.id, ...estimate, feasibility };
    } catch (e) {
      if (e instanceof MeterCalculationError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }

  async getAdminConfig() {
    return this.getActiveConfigOrThrow();
  }

  async updateConfig(input: UpdateMeterConfigInput) {
    const config = await this.getActiveConfigOrThrow();

    await this.prisma.client.$transaction(async (tx) => {
      await tx.meterConfig.update({
        where: { id: config.id },
        data: {
          ...(input.disclaimer !== undefined ? { disclaimer: input.disclaimer } : {}),
          ...(input.outputMode !== undefined ? { outputMode: input.outputMode } : {}),
        },
      });

      if (input.destinationRates) {
        for (const rate of input.destinationRates) {
          await tx.meterDestinationRate.upsert({
            where: {
              meterConfigId_destinationId: {
                meterConfigId: config.id,
                destinationId: rate.destinationId,
              },
            },
            update: { baseRatePerNight: rate.baseRatePerNight },
            create: {
              meterConfigId: config.id,
              destinationId: rate.destinationId,
              baseRatePerNight: rate.baseRatePerNight,
            },
          });
        }
      }

      if (input.vehicleTiers) {
        await tx.meterVehicleTier.deleteMany({ where: { meterConfigId: config.id } });
        for (const [index, tier] of input.vehicleTiers.entries()) {
          await tx.meterVehicleTier.create({
            data: {
              meterConfigId: config.id,
              name: tier.name,
              multiplier: tier.multiplier,
              displayOrder: tier.displayOrder ?? index,
            },
          });
        }
      }
    });

    return this.getActiveConfigOrThrow();
  }

  private async getActiveConfigOrThrow() {
    const config = await this.prisma.client.meterConfig.findFirst({
      where: { active: true },
      include: {
        destinationRates: {
          include: { destination: { select: { id: true, name: true, slug: true, active: true } } },
        },
        vehicleTiers: { orderBy: { displayOrder: "asc" } },
      },
    });
    if (!config) throw new NotFoundException("Meter configuration not found");
    return config;
  }

  private toCalculatorConfig(
    config: Awaited<ReturnType<MeterService["getActiveConfigOrThrow"]>>,
  ) {
    const activeDestinations = config.destinationRates.filter((r) => r.destination.active);
    return {
      currency: config.currency,
      disclaimer: config.disclaimer,
      outputMode: config.outputMode as "range" | "fixed",
      rangeSpreadPercent: 10,
      destinations: activeDestinations.map((r) => ({
        slug: r.destination.slug,
        baseRatePerNight: decimalToNumber(r.baseRatePerNight),
      })),
      vehicleTiers: config.vehicleTiers.map((t) => ({
        name: t.name,
        multiplier: decimalToNumber(t.multiplier),
      })),
    };
  }
}
