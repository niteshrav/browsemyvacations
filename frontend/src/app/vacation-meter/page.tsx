import type { Metadata } from "next";
import { buildPageMetadata, PUBLIC_PAGE_SEO } from "@/lib/seo";
import { VacationMeterClient } from "./vacation-meter-client";

export const metadata: Metadata = buildPageMetadata(PUBLIC_PAGE_SEO.vacationMeter);

export default function VacationMeterPage() {
  return <VacationMeterClient />;
}
