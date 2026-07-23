import { HeroSmartSearch } from "@/components/hero-smart-search";

type Props = {
  defaultQuery?: string;
};

/** Homepage/search smart autocomplete (city, destination, package combinations). */
export function HeroSearch({ defaultQuery = "" }: Props) {
  return <HeroSmartSearch defaultQuery={defaultQuery} />;
}
