import { formatInrPrice } from "./format";

type MeterEstimateDisplay = {
  estimateMin?: number;
  estimateMax?: number;
  estimateFixed?: number;
};

export function formatMeterEstimate(estimate: MeterEstimateDisplay): string {
  if (estimate.estimateFixed !== undefined) {
    return formatInrPrice(estimate.estimateFixed, true);
  }
  if (estimate.estimateMin !== undefined && estimate.estimateMax !== undefined) {
    return `${formatInrPrice(estimate.estimateMin, true)} – ${formatInrPrice(estimate.estimateMax, true)}`;
  }
  return "—";
}
