export type Suggestion = {
  id: string;
  label: string;
  type: "destination" | "package";
  action: "filter" | "scroll";
  imageUrl?: string | null;
  destinationSlug: string | null;
  packageSlug: string | null;
};
