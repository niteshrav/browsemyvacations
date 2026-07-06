import type { Metadata } from "next";
import { VacationMeterClient } from "./vacation-meter-client";

export const metadata: Metadata = {
  title: "Vacation Feasibility Radar",
  description: "Plan your route, check real-time feasibility, and request a custom quote.",
};

export default function VacationMeterPage() {
  return <VacationMeterClient />;
}
