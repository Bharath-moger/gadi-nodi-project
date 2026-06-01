import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { PartnerOnboardingForm } from "@/components/partner-onboarding-form";
import { loadPartnerTypesCatalog } from "@/lib/api";
import { fetchAuthMe } from "@/lib/auth/me";

export const metadata: Metadata = {
  title: "Seller onboarding",
  description: "Create a Gadinodi seller account for garages, showrooms, independents, and fleet partners.",
  robots: { index: false, follow: false },
};

export default async function PartnerOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const me = await fetchAuthMe();
  if (me?.partnerProfile) {
    redirect("/partner/dashboard");
  }

  const { type } = await searchParams;
  const { partnerTypes, apiAvailable } = await loadPartnerTypesCatalog();
  const options = partnerTypes.map((p) => ({ slug: p.slug, name: p.name }));
  const initialSlug =
    type && partnerTypes.some((p) => p.slug === type) ? type : (partnerTypes[0]?.slug ?? null);

  return (
    <section className="auth-page">
      <div className="container">
        <div className="breadcrumb auth-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/partners">For sellers</Link>
          <span>/</span>
          <span>Onboarding</span>
        </div>

        <div className="panel auth-panel">
          {!apiAvailable ? <CatalogOfflineBanner /> : null}
          <p className="eyebrow">Seller account</p>
          <h1>Onboarding</h1>
          <p className="page-copy auth-lead">
            Choose your seller category, add business details, and you will land in the partner portal to
            manage inventory on Gadinodi.
          </p>
          <PartnerOnboardingForm
            partnerTypes={options}
            initialPartnerSlug={initialSlug}
            mode={me ? "complete" : "register"}
            signedInEmail={me?.email}
            defaultName={me?.name ?? ""}
          />
        </div>
      </div>
    </section>
  );
}
