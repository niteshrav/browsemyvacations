import { describe, expect, it } from "vitest";
import { DEFAULT_METER_VEHICLE_TIERS, resolveVehicleTiers } from "./meter-vehicle-tiers";

describe("resolveVehicleTiers", () => {
  it("returns API tiers when provided", () => {
    const tiers = resolveVehicleTiers([{ name: "Tempo", multiplier: 1.3 }]);
    expect(tiers).toHaveLength(1);
    expect(tiers[0]?.name).toBe("Tempo");
  });

  it("returns default tiers when API list is empty", () => {
    expect(resolveVehicleTiers([])).toEqual(DEFAULT_METER_VEHICLE_TIERS);
    expect(resolveVehicleTiers(null)).toEqual(DEFAULT_METER_VEHICLE_TIERS);
  });
});
