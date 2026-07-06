export type Suggestion = {
  id: string;
  label: string;
  type: "destination" | "package";
  action: "filter" | "scroll";
  destinationSlug: string | null;
  packageSlug: string | null;
};
