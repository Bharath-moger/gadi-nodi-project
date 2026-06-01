import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { getSparePartBySlug } from "@/lib/api";
import { getSession } from "@/lib/auth/session";
import { siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils";

interface SparePartDetailPageProps {
  params: Promise<{ slug: string }>;
}

function enquiryMailto(title: string) {
  const subject = encodeURIComponent(`Parts enquiry: ${title}`);
  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: SparePartDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const part = await getSparePartBySlug(slug);

  if (!part) {
    return { title: "Part not found" };
  }

  return {
    title: part.title,
    description: part.summary,
    alternates: {
      canonical: `/spare-parts/${part.slug}`,
    },
    openGraph: {
      title: `${part.title} | Gadinodi`,
      description: part.summary,
      url: `${siteConfig.url}/spare-parts/${part.slug}`,
      type: "website",
    },
  };
}

export default async function SparePartDetailPage({ params }: SparePartDetailPageProps) {
  const { slug } = await params;
  const [part, session] = await Promise.all([getSparePartBySlug(slug), getSession()]);

  if (!part) {
    notFound();
  }

  const isSignedIn = Boolean(session);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Spare parts",
          item: `${siteConfig.url}/spare-parts`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: part.title,
          item: `${siteConfig.url}/spare-parts/${part.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: part.title,
      description: part.summary,
      category: part.category,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: part.price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: part.sellerName,
        },
      },
    },
  ];

  return (
    <>
      <StructuredData data={schema} />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/spare-parts">Spare parts</Link>
            <span>/</span>
            <span>{part.title}</span>
          </div>

          <div className="pdp-hero">
            <div className="pdp-hero__media" style={{ background: part.heroTone }}>
              <span className="vehicle-card__badge">{part.condition}</span>
              <span className="vehicle-card__seller">{part.category}</span>
            </div>

            <div className="pdp-hero__content">
              <p className="eyebrow">{part.location}</p>
              <h1>{part.title}</h1>
              <p className="page-copy">{part.description}</p>

              <div className="pdp-inline-meta">
                {part.partNumber ? <span>Part #{part.partNumber}</span> : null}
                <span>{part.sellerType}</span>
                <span>{part.sellerName}</span>
              </div>

              <article className="mini-stat spare-part-pdp__fit">
                <span>Compatibility</span>
                <strong>{part.compatibility}</strong>
              </article>
            </div>

            <aside className="purchase-panel">
              <p className="eyebrow">Price</p>
              <strong className="purchase-panel__price">{formatCurrency(part.price)}</strong>
              {part.warranty ? <p>{part.warranty}</p> : null}
              <div className="purchase-panel__actions">
                {isSignedIn ? (
                  <Link className="button button--primary" href={enquiryMailto(part.title)}>
                    Email your enquiry
                  </Link>
                ) : (
                  <Link className="button button--primary" href="/login">
                    Sign in to enquire
                  </Link>
                )}
                <Link className="button button--secondary" href="/spare-parts">
                  More spare parts
                </Link>
              </div>
              <ul className="compact-list">
                <li>Seller: {part.sellerName}</li>
                <li>Ships from: {part.location}</li>
                <li>Category: {part.category}</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pdp-layout">
          <div className="pdp-content">
            <article className="panel">
              <p className="eyebrow">Highlights</p>
              <h2>What you get</h2>
              <p>{part.summary}</p>
              <ul className="feature-list">
                {part.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>

            <article className="panel">
              <p className="eyebrow">Fitment</p>
              <h2>Before you purchase</h2>
              <p>
                Confirm chassis or engine codes, model year, and trim with the seller. Gadinodi
                lists marketplace offers; the seller is responsible for part authenticity and
                returns policy.
              </p>
            </article>
          </div>

          <aside className="pdp-sidebar">
            <article className="panel">
              <p className="eyebrow">Seller</p>
              <h3>{part.sellerName}</h3>
              <p>{part.sellerType}</p>
              <ul className="compact-list">
                <li>Listed from {part.location}</li>
                <li>Use enquiry email for compatibility questions</li>
              </ul>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
