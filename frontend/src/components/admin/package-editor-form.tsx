"use client";

import { useEffect, useState } from "react";
import { slugifyPackageTitle } from "@bmv/shared";
import {
  PackageItineraryEditor,
  type ItineraryDayForm,
} from "@/components/admin/package-itinerary-editor";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

export type PackageFormDestination = { id: string; name: string };

export type PackageFormFaq = { question: string; answer: string };

export type PackageFormValues = {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  durationDays: number;
  durationNights: number;
  priceFrom: number;
  discountPrice: string;
  shortDescription: string;
  pickupLocation: string;
  dropLocation: string;
  whyBook: string;
  inclusions: string;
  exclusions: string;
  hotelDetails: string;
  mealPlan: string;
  transportDetails: string;
  activities: string;
  cancellationPolicy: string;
  termsAndConditions: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  featured: boolean;
  popular: boolean;
  active: boolean;
  destinationIds: string[];
  itineraryDays: ItineraryDayForm[];
  faq: PackageFormFaq[];
};

type Props = {
  mode: "create" | "edit";
  destinations: PackageFormDestination[];
  initial: PackageFormValues;
  submitting: boolean;
  onSubmit: (values: PackageFormValues) => Promise<void>;
  onCancel?: () => void;
};

function linesToText(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

function textToLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function emptyPackageForm(destinationId?: string): PackageFormValues {
  return {
    title: "",
    slug: "",
    categorySlug: "custom",
    categoryName: "Custom Packages",
    durationDays: 2,
    durationNights: 1,
    priceFrom: 0,
    discountPrice: "",
    shortDescription: "",
    pickupLocation: "",
    dropLocation: "",
    whyBook: "",
    inclusions: "",
    exclusions: "",
    hotelDetails: "",
    mealPlan: "",
    transportDetails: "",
    activities: "",
    cancellationPolicy: "",
    termsAndConditions: "",
    seoTitle: "",
    seoDescription: "",
    status: "draft",
    featured: false,
    popular: false,
    active: true,
    destinationIds: destinationId ? [destinationId] : [],
    itineraryDays: [{ dayNumber: 1, title: "", cities: "", summary: "" }],
    faq: [],
  };
}

export function packageToFormValues(pkg: {
  title: string;
  slug: string;
  categorySlug?: string;
  categoryName?: string;
  durationDays?: number;
  durationNights?: number;
  priceFrom?: string | number;
  discountPrice?: string | number | null;
  shortDescription?: string;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  whyBook?: unknown;
  inclusions?: unknown;
  exclusions?: unknown;
  hotelDetails?: string | null;
  mealPlan?: string | null;
  transportDetails?: string | null;
  activities?: unknown;
  cancellationPolicy?: string | null;
  termsAndConditions?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status?: "draft" | "published";
  featured?: boolean;
  popular?: boolean;
  active?: boolean;
  destinations?: Array<{ destination: { id: string; name: string } }>;
  itineraryDays?: Array<{
    dayNumber: number;
    title: string;
    cities: unknown;
    summary: string;
  }>;
  faq?: unknown;
}): PackageFormValues {
  const asLines = (value: unknown) =>
    linesToText(Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);
  const faqItems = Array.isArray(pkg.faq)
    ? pkg.faq
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const record = item as { question?: unknown; answer?: unknown };
          if (typeof record.question !== "string" || typeof record.answer !== "string") return null;
          return { question: record.question, answer: record.answer };
        })
        .filter((item): item is PackageFormFaq => item !== null)
    : [];

  return {
    title: pkg.title,
    slug: pkg.slug,
    categorySlug: pkg.categorySlug ?? "custom",
    categoryName: pkg.categoryName ?? "Custom Packages",
    durationDays: pkg.durationDays ?? 2,
    durationNights: pkg.durationNights ?? 1,
    priceFrom: Number(pkg.priceFrom ?? 0),
    discountPrice: pkg.discountPrice != null && pkg.discountPrice !== "" ? String(pkg.discountPrice) : "",
    shortDescription: pkg.shortDescription ?? "",
    pickupLocation: pkg.pickupLocation ?? "",
    dropLocation: pkg.dropLocation ?? "",
    whyBook: asLines(pkg.whyBook),
    inclusions: asLines(pkg.inclusions),
    exclusions: asLines(pkg.exclusions),
    hotelDetails: pkg.hotelDetails ?? "",
    mealPlan: pkg.mealPlan ?? "",
    transportDetails: pkg.transportDetails ?? "",
    activities: asLines(pkg.activities),
    cancellationPolicy: pkg.cancellationPolicy ?? "",
    termsAndConditions: pkg.termsAndConditions ?? "",
    seoTitle: pkg.seoTitle ?? "",
    seoDescription: pkg.seoDescription ?? "",
    status: pkg.status ?? "published",
    featured: Boolean(pkg.featured),
    popular: Boolean(pkg.popular),
    active: pkg.active !== false,
    destinationIds: (pkg.destinations ?? []).map((d) => d.destination.id),
    itineraryDays:
      pkg.itineraryDays && pkg.itineraryDays.length > 0
        ? pkg.itineraryDays.map((day) => ({
            dayNumber: day.dayNumber,
            title: day.title,
            cities: Array.isArray(day.cities)
              ? day.cities.filter((c): c is string => typeof c === "string").join(", ")
              : "",
            summary: day.summary,
          }))
        : [{ dayNumber: 1, title: "", cities: "", summary: "" }],
    faq: faqItems,
  };
}

export function formValuesToPayload(values: PackageFormValues) {
  const discount = values.discountPrice.trim() ? Number(values.discountPrice) : null;
  return {
    title: values.title.trim(),
    slug: values.slug.trim() || slugifyPackageTitle(values.title),
    categorySlug: values.categorySlug.trim() || "custom",
    categoryName: values.categoryName.trim() || "Custom Packages",
    durationDays: Number(values.durationDays),
    durationNights: Number(values.durationNights),
    shortDescription: values.shortDescription.trim(),
    priceFrom: Number(values.priceFrom),
    discountPrice: discount && !Number.isNaN(discount) ? discount : null,
    pickupLocation: values.pickupLocation.trim() || null,
    dropLocation: values.dropLocation.trim() || null,
    whyBook: textToLines(values.whyBook),
    inclusions: textToLines(values.inclusions),
    exclusions: textToLines(values.exclusions),
    hotelDetails: values.hotelDetails.trim() || null,
    mealPlan: values.mealPlan.trim() || null,
    transportDetails: values.transportDetails.trim() || null,
    activities: textToLines(values.activities),
    cancellationPolicy: values.cancellationPolicy.trim() || null,
    termsAndConditions: values.termsAndConditions.trim() || null,
    seoTitle: values.seoTitle.trim() || null,
    seoDescription: values.seoDescription.trim() || null,
    status: values.status,
    featured: values.featured,
    popular: values.popular,
    active: values.active,
    destinationIds: values.destinationIds,
    itineraryDays: values.itineraryDays.map((day, index) => ({
      dayNumber: index + 1,
      title: day.title.trim(),
      cities: day.cities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      summary: day.summary.trim(),
    })),
    faq: values.faq
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question && item.answer),
  };
}

export function PackageEditorForm({ mode, destinations, initial, submitting, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<PackageFormValues>(initial);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  useEffect(() => {
    setValues(initial);
    setSlugTouched(mode === "edit");
  }, [initial, mode]);

  function patch<K extends keyof PackageFormValues>(key: K, value: PackageFormValues[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugifyPackageTitle(String(value));
      }
      return next;
    });
  }

  function toggleDestination(id: string) {
    setValues((prev) => ({
      ...prev,
      destinationIds: prev.destinationIds.includes(id)
        ? prev.destinationIds.filter((d) => d !== id)
        : [...prev.destinationIds, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.destinationIds.length === 0) return;
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={adminLabelClassName()}>Package title</label>
          <input
            required
            value={values.title}
            onChange={(e) => patch("title", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Slug (auto)</label>
          <input
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              patch("slug", e.target.value);
            }}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Category name</label>
          <input
            value={values.categoryName}
            onChange={(e) => {
              const name = e.target.value;
              setValues((prev) => ({
                ...prev,
                categoryName: name,
                categorySlug: slugifyPackageTitle(name) || "custom",
              }));
            }}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Category slug</label>
          <input
            value={values.categorySlug}
            onChange={(e) => patch("categorySlug", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Duration days</label>
          <input
            type="number"
            min={1}
            required
            value={values.durationDays}
            onChange={(e) => patch("durationDays", Number(e.target.value))}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Duration nights</label>
          <input
            type="number"
            min={0}
            required
            value={values.durationNights}
            onChange={(e) => patch("durationNights", Number(e.target.value))}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Starting price (INR)</label>
          <input
            type="number"
            min={1}
            required
            value={values.priceFrom || ""}
            onChange={(e) => patch("priceFrom", Number(e.target.value))}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Discount price (optional)</label>
          <input
            type="number"
            min={1}
            value={values.discountPrice}
            onChange={(e) => patch("discountPrice", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Pickup location</label>
          <input
            value={values.pickupLocation}
            onChange={(e) => patch("pickupLocation", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Drop location</label>
          <input
            value={values.dropLocation}
            onChange={(e) => patch("dropLocation", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div className="md:col-span-2">
          <label className={adminLabelClassName()}>Short description</label>
          <textarea
            required
            rows={3}
            value={values.shortDescription}
            onChange={(e) => patch("shortDescription", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
      </div>

      <div>
        <p className={adminLabelClassName()}>Destination cities (multi-select)</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => {
            const checked = values.destinationIds.includes(d.id);
            return (
              <label
                key={d.id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  checked ? "border-teal-300 bg-teal-50 text-teal-900" : "border-stone-200 bg-white"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleDestination(d.id)} />
                {d.name}
              </label>
            );
          })}
        </div>
        {values.destinationIds.length === 0 ? (
          <p className="mt-2 text-xs text-red-600">Select at least one destination.</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={adminLabelClassName()}>Why book this (one per line)</label>
          <textarea
            rows={4}
            value={values.whyBook}
            onChange={(e) => patch("whyBook", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Activities (one per line)</label>
          <textarea
            rows={4}
            value={values.activities}
            onChange={(e) => patch("activities", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Includes (one per line)</label>
          <textarea
            rows={4}
            value={values.inclusions}
            onChange={(e) => patch("inclusions", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Excludes (one per line)</label>
          <textarea
            rows={4}
            value={values.exclusions}
            onChange={(e) => patch("exclusions", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Hotel details</label>
          <textarea
            rows={3}
            value={values.hotelDetails}
            onChange={(e) => patch("hotelDetails", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>Meal plan</label>
          <input
            value={values.mealPlan}
            onChange={(e) => patch("mealPlan", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div className="md:col-span-2">
          <label className={adminLabelClassName()}>Transport details</label>
          <textarea
            rows={3}
            value={values.transportDetails}
            onChange={(e) => patch("transportDetails", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div className="md:col-span-2">
          <label className={adminLabelClassName()}>Cancellation policy</label>
          <textarea
            rows={3}
            value={values.cancellationPolicy}
            onChange={(e) => patch("cancellationPolicy", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div className="md:col-span-2">
          <label className={adminLabelClassName()}>Terms & conditions</label>
          <textarea
            rows={3}
            value={values.termsAndConditions}
            onChange={(e) => patch("termsAndConditions", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>SEO title</label>
          <input
            value={values.seoTitle}
            onChange={(e) => patch("seoTitle", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
        <div>
          <label className={adminLabelClassName()}>SEO description</label>
          <textarea
            rows={2}
            value={values.seoDescription}
            onChange={(e) => patch("seoDescription", e.target.value)}
            className={adminInputClassName()}
          />
        </div>
      </div>

      <PackageItineraryEditor
        days={values.itineraryDays}
        onChange={(itineraryDays) => patch("itineraryDays", itineraryDays)}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className={adminLabelClassName()}>FAQ</p>
          <button
            type="button"
            className="btn-secondary px-3 py-1.5 text-xs"
            onClick={() => patch("faq", [...values.faq, { question: "", answer: "" }])}
          >
            Add FAQ
          </button>
        </div>
        {values.faq.length === 0 ? (
          <p className="text-xs text-stone-500">No FAQs yet.</p>
        ) : (
          <ul className="space-y-3">
            {values.faq.map((item, index) => (
              <li key={`faq-${index}`} className="rounded-xl border border-stone-200 bg-white p-4">
                <div className="mb-2 flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-red-600 hover:underline"
                    onClick={() => patch("faq", values.faq.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
                <input
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => {
                    const next = [...values.faq];
                    next[index] = { ...item, question: e.target.value };
                    patch("faq", next);
                  }}
                  className={adminInputClassName()}
                />
                <textarea
                  placeholder="Answer"
                  rows={2}
                  value={item.answer}
                  onChange={(e) => {
                    const next = [...values.faq];
                    next[index] = { ...item, answer: e.target.value };
                    patch("faq", next);
                  }}
                  className={`${adminInputClassName()} mt-2`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
        <label className="flex items-center gap-2 text-sm">
          <span>Status</span>
          <select
            value={values.status}
            onChange={(e) => patch("status", e.target.value as "draft" | "published")}
            className={adminInputClassName()}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => patch("featured", e.target.checked)}
          />
          Featured package
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.popular}
            onChange={(e) => patch("popular", e.target.checked)}
          />
          Popular package
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.active} onChange={(e) => patch("active", e.target.checked)} />
          Active
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={submitting || values.destinationIds.length === 0} className="btn-primary">
          {submitting ? "Saving…" : mode === "create" ? "Create package" : "Save changes"}
        </button>
        {onCancel ? (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
