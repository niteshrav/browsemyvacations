import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT_PAGE } from "@bmv/shared";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Browse My Vacations — curated Rajasthan packages and personalized quotes from travel experts.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-stone">
      <h1>{ABOUT_PAGE.heading}</h1>
      <p className="lead">{ABOUT_PAGE.intro}</p>

      {ABOUT_PAGE.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.title}</h2>
          {"body" in section && section.body ? <p>{section.body}</p> : null}
          {"bullets" in section && section.bullets ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <p>
        <Link href={ABOUT_PAGE.contactCta.href} className="text-teal-800 no-underline hover:underline">
          {ABOUT_PAGE.contactCta.label}
        </Link>
      </p>
    </div>
  );
}
