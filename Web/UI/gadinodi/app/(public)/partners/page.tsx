import type { Metadata } from "next";
import Link from "next/link";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { loadPartnerTypesCatalog } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";

const pageDescription =
  "Learn how garages, car showrooms, independent dealers, and specialist sellers list on Gadinodi—and what buyers see for each partner type.";

export const metadata: Metadata = {
  title: "Seller types",
  description: pageDescription,
  alternates: {
    canonical: "/partners",
  },
};

export default async function PartnersPage() {
  const { partnerTypes, apiAvailable } = await loadPartnerTypesCatalog();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seller types on Gadinodi",
    description: pageDescription,
    url: `${siteConfig.url}/partners`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: partnerTypes.length,
      itemListElement: partnerTypes.map((partnerType, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: partnerType.name,
        url: `${siteConfig.url}/partners/${partnerType.slug}`,
        description: partnerType.description,
      })),
    },
  };

  return (
    <div className="partners-hub">
      <StructuredData data={schema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <section className="partners-hub__hero" aria-labelledby="partners-hub-title">
        <div className="partners-hub__hero-bg" aria-hidden />
        <div className="container partners-hub__hero-inner">
          <nav className="partners-hub__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>For sellers</span>
          </nav>

          <div className="partners-hub__hero-row">
            <div className="partners-hub__intro">
              <p className="eyebrow">Partner programme</p>
              <h1 id="partners-hub-title">Sell with a clear story buyers can trust</h1>
              <p className="partners-hub__lead">
                Gadinodi groups garages, showrooms, independents, and specialists into transparent
                categories—so the right buyers understand your strengths before they call.
              </p>
            </div>
            {partnerTypes.length > 0 ? (
              <div className="partners-hub__stat" aria-live="polite">
                <span className="partners-hub__stat-value">{partnerTypes.length}</span>
                <span className="partners-hub__stat-label">Seller categories</span>
              </div>
            ) : null}
          </div>

          <div className="partners-hub__buyer-strip">
            <p>
              <strong>Buying?</strong> Browse live inventory and filter by seller context on{" "}
              <Link href="/vehicles" className="text-link">
                Vehicles
              </Link>{" "}
              or explore{" "}
              <Link href="/spare-parts" className="text-link">
                spare parts
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="partners-hub__main">
        <div className="container">
          <SectionHeading
            align="center"
            className="partners-hub__section-heading"
            eyebrow="Seller categories"
            title="How each partner type shows up"
            description="Open a category for audience notes, proof points, and the same merchandising language buyers see next to listings."
          />

          {partnerTypes.length === 0 ? (
            <div className="partners-hub__empty">
              <p className="partners-hub__empty-title">No partner categories loaded</p>
              <p className="partners-hub__empty-copy">
                {apiAvailable
                  ? "Partner profiles will appear here once they are configured in the catalogue."
                  : "We could not reach the marketplace service. Try again in a moment."}
              </p>
              <Link href="/" className="button button--secondary">
                Back to home
              </Link>
            </div>
          ) : (
            <div className="partners-hub__grid">
              {partnerTypes.map((partnerType) => (
                <article key={partnerType.slug} className="partners-hub__card">
                  <header className="partners-hub__card-head">
                    <span className="partners-hub__badge">{partnerType.badge}</span>
                    <h3 className="partners-hub__card-title">{partnerType.name}</h3>
                    <p className="partners-hub__audience">{partnerType.audience}</p>
                  </header>
                  <p className="partners-hub__desc">{partnerType.description}</p>
                  <ul className="partners-hub__highlights">
                    {partnerType.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {partnerType.metrics.length > 0 ? (
                    <ul className="partners-hub__metrics" aria-label="Key metrics">
                      {partnerType.metrics.slice(0, 3).map((metric) => (
                        <li key={metric.label} className="partners-hub__metric">
                          <span className="partners-hub__metric-label">{metric.label}</span>
                          <span className="partners-hub__metric-value">{metric.value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link className="button button--primary partners-hub__card-cta" href={`/partners/${partnerType.slug}`}>
                    {partnerType.ctaLabel}
                    <span aria-hidden> →</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="partners-hub__closing">
        <div className="container partners-hub__closing-inner">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="partners-hub__closing-title">Ready to list or still comparing channels?</h2>
            <p className="partners-hub__closing-lead">
              Pick a seller type to read the full playbook, then create an account when you want to save
              listings or route enquiries through Gadinodi.
            </p>
          </div>
          <div className="partners-hub__closing-actions">
            <Link className="button button--primary" href="/partner/onboarding">
              Create seller account
            </Link>
            <Link className="button button--ghost" href="/partner/login">
              Seller sign in
            </Link>
            <Link className="button button--secondary" href="/vehicles">
              View buyer experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
