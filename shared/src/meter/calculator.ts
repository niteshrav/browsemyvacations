export type MeterDestinationRate = {
  slug: string;
  baseRatePerNight: number;
};

export type MeterVehicleTier = {
  name: string;
  multiplier: number;
};

export type MeterCalculatorConfig = {
  currency: string;
  disclaimer: string;
  outputMode: "range" | "fixed";
  /** Half-width of range band, e.g. 8 → ±8% */
  rangeSpreadPercent: number;
  destinations: MeterDestinationRate[];
  vehicleTiers: MeterVehicleTier[];
};

export type MeterCalculateInput = {
  destinationSlugs: string[];
  totalNights: number;
  pickupTime: string;
  dropoffTime: string;
  travelDate: string;
  vehicleTierName: string;
};

export type MeterBreakdownLine = {
  label: string;
  amount: number;
};

export type MeterEstimateResult = {
  currency: string;
  disclaimer: string;
  estimateMin?: number;
  estimateMax?: number;
  estimateFixed?: number;
  breakdown: MeterBreakdownLine[];
};

export class MeterCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MeterCalculationError";
  }
}

function roundInr(value: number): number {
  return Math.round(value);
}

function parseHour(time: string): number {
  const [h] = time.split(":").map(Number);
  return Number.isFinite(h) ? h : 12;
}

/** Pure estimate engine — no I/O (ARCHITECTURE §7.3). */
export function calculateMeterEstimate(
  input: MeterCalculateInput,
  config: MeterCalculatorConfig,
): MeterEstimateResult {
  const slugs = input.destinationSlugs.map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (slugs.length === 0) {
    throw new MeterCalculationError("Select at least one destination");
  }

  const rates = slugs.map((slug) => {
    const dest = config.destinations.find((d) => d.slug === slug);
    if (!dest) {
      throw new MeterCalculationError(`Destination not supported: ${slug}`);
    }
    return dest.baseRatePerNight;
  });

  const avgNightly = rates.reduce((sum, r) => sum + r, 0) / rates.length;
  const lodging = avgNightly * input.totalNights;

  const tier =
    config.vehicleTiers.find(
      (t) => t.name.toLowerCase() === input.vehicleTierName.trim().toLowerCase(),
    ) ?? config.vehicleTiers[0];
  const multiplier = tier?.multiplier ?? 1;

  let subtotal = lodging * multiplier;

  const pickupHour = parseHour(input.pickupTime);
  if (pickupHour < 6 || pickupHour >= 22) {
    subtotal *= 1.05;
  }

  const breakdown: MeterBreakdownLine[] = [
    { label: `Lodging (${input.totalNights} nights)`, amount: roundInr(lodging) },
    {
      label: `Vehicle (${tier?.name ?? "Standard"})`,
      amount: roundInr(subtotal - lodging),
    },
  ];

  const base: MeterEstimateResult = {
    currency: config.currency,
    disclaimer: config.disclaimer,
    breakdown,
  };

  if (config.outputMode === "fixed") {
    return { ...base, estimateFixed: roundInr(subtotal) };
  }

  const spread = config.rangeSpreadPercent / 100;
  return {
    ...base,
    estimateMin: roundInr(subtotal * (1 - spread)),
    estimateMax: roundInr(subtotal * (1 + spread)),
  };
}
