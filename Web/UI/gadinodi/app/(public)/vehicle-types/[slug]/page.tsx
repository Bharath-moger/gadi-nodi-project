import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { VehicleCard } from "@/components/vehicle-card";
import { getVehicleTypeBySlug, getVehicleTypeSlugs } from "@/lib/api";
import { getSession } from "@/lib/auth/session";
import { siteConfig } from "@/lib/site-config";

interface VehicleTypeDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getVehicleTypeSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: VehicleTypeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getVehicleTypeBySlug(slug);
  if (!detail) {
    return { title: "Vehicle type not found" };
  }
  return {
    title: `${detail.displayName} listings`,
    description: detail.description,
    alternates: {
      canonical: `/vehicle-types/${detail.slug}`,
    },
    openGraph: {
      title: `${detail.displayName} | ${siteConfig.name}`,
      description: detail.description,
      images: [{ url: detail.imageUrl, width: 1600, height: 900 }],
    },
  };
}

export default async function VehicleTypeDetailPage({
  params,
}: VehicleTypeDetailPageProps) {
  const { slug } = await params;
  const [detail, session] = await Promise.all([
    getVehicleTypeBySlug(slug),
    getSession(),
  ]);

  if (!detail) {
    notFound();
  }

  const isSignedIn = Boolean(session);
  const listingsHref = `/vehicles?bodyStyle=${encodeURIComponent(detail.code)}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Vehicle types",
          item: `${siteConfig.url}/vehicle-types`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: detail.displayName,
          item: `${siteConfig.url}/vehicle-types/${detail.slug}`,
        },
      ],
    },
    ...(detail.sampleListings.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${detail.displayName} listings`,
            numberOfItems: detail.sampleListings.length,
            itemListElement: detail.sampleListings.map((v, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/vehicles/${v.slug}`,
              name: v.title,
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <StructuredData data={schema} />

      <section className="vt-detail-hero">
        <div className="vt-detail-hero__media">
          <Image
            src={detail.imageUrl}
            alt={`${detail.displayName} — browse listings on Gadinodi`}
            fill
            priority
            sizes="100vw"
            className="vt-detail-hero__img"
          />
          <div className="vt-detail-hero__overlay" aria-hidden />
        </div>
        <div className="container vt-detail-hero__content">
          <div className="breadcrumb vt-detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/vehicle-types">Vehicle types</Link>
            <span>/</span>
            <span>{detail.displayName}</span>
          </div>
          <p className="vt-detail-hero__eyebrow">{detail.listingCount} live listings</p>
          <h1 className="vt-detail-hero__title">{detail.displayName}</h1>
          <p className="vt-detail-hero__lead">{detail.description}</p>
          <div className="vt-detail-hero__actions">
            <Link className="button button--primary" href={listingsHref}>
              Browse {detail.displayName} inventory
            </Link>
            <Link className="button button--secondary vt-detail-hero__ghost" href="/vehicle-types">
              All types
            </Link>
          </div>
        </div>
      </section>

      <section className="section vt-detail-body">
        <div className="container">
          <div className="vt-detail-split">
            <article className="panel vt-detail-panel">
              <p className="eyebrow">Buying on Gadinodi</p>
              <h2>Filtered inventory for this category</h2>
              <p>
                Listings are matched to seller-declared type (<strong>{detail.code}</strong>). Use
                condition and fuel filters on the inventory page to narrow results further.
              </p>
              <ul className="feature-list">
                <li>Compare sellers by location and seller type</li>
                <li>See indicative EMI and specs on each listing</li>
                <li>Sign in to email enquiries from vehicle pages</li>
              </ul>
            </article>
            <aside className="panel vt-detail-panel vt-detail-panel--accent">
              <p className="eyebrow">Quick stats</p>
              <p className="vt-detail-stat">
                <strong>{detail.listingCount}</strong>
                <span>Active listings in this type</span>
              </p>
              <p className="vt-detail-help">
                Typical price bands vary by region — open listings for exact pricing and seller
                notes.
              </p>
              <Link href={listingsHref} className="button button--primary vt-detail-panel__btn">
                Open filtered search
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Sample inventory</p>
            <h2>Recently listed {detail.displayName.toLowerCase()} vehicles</h2>
            <p>
              Showing up to eight listings. Explore the full set from the button above — totals and
              filters stay in sync with the catalogue.
            </p>
          </div>

          {detail.sampleListings.length > 0 ? (
            <div className="vehicle-grid">
              {detail.sampleListings.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} isSignedIn={isSignedIn} />
              ))}
            </div>
          ) : (
            <p className="home-empty">
              No listings in this type yet.{" "}
              <Link href="/vehicles">Browse all vehicles</Link> or check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
