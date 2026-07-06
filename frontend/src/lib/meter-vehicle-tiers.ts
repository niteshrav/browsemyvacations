export type MeterVehicleTier = {
  name: string;
  multiplier: number;
};

export const DEFAULT_METER_VEHICLE_TIERS: MeterVehicleTier[] = [
  { name: "Sedan", multiplier: 1 },
  { name: "SUV", multiplier: 1.15 },
  { name: "Innova", multiplier: 1.25 },
];

export function resolveVehicleTiers(
  apiTiers: MeterVehicleTier[] | undefined | null,
): MeterVehicleTier[] {
  if (apiTiers && apiTiers.length > 0) return apiTiers;
  return DEFAULT_METER_VEHICLE_TIERS;
}
