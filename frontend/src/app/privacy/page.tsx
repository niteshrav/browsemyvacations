import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Browse My Vacations collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-stone">
      <h1 className="text-3xl font-bold text-teal-900">Privacy Policy</h1>
      <p className="mt-4 text-stone-600">Last updated: May 2026</p>

      <section className="mt-8 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">What we collect</h2>
        <p>
          When you request a quote or use our Vacation Meter, we collect information you provide
          (such as name, email, phone, travel preferences, and optional message). We may also
          collect basic usage analytics on our website to improve the service.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">How we use it</h2>
        <p>
          We use your details to respond to travel inquiries, prepare custom quotes, and—only if
          you opt in—send relevant marketing about our packages. We do not sell your personal data.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Storage and security</h2>
        <p>
          Data is transmitted over HTTPS and stored on secure infrastructure. Access is limited to
          authorized team members who need it to fulfill your request.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Your choices</h2>
        <p>
          You may withdraw marketing consent at any time by contacting us. You can request access or
          correction of your data via our{" "}
          <Link href="/contact" className="text-teal-700 hover:underline">
            contact page
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Analytics</h2>
        <p>
          We may use privacy-friendly analytics (such as Google Analytics or PostHog) to understand
          how visitors use search, quote forms, and the Vacation Meter. These tools may use cookies;
          you can control cookies through your browser settings.
        </p>
      </section>

      <Link href="/" className="mt-10 inline-block text-teal-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
