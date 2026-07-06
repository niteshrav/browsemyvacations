"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type Props = { query: string };

export function SearchAnalytics({ query }: Props) {
  useEffect(() => {
    if (query.trim()) {
      trackEvent(ANALYTICS_EVENTS.search, { query: query.trim() });
    }
  }, [query]);

  return null;
}
