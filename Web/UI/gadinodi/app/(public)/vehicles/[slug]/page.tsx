import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { VehicleCard } from "@/components/vehicle-card";
import { getRelatedVehicles, getVehicleBySlug } from "@/lib/api";
import { getSession } from "@/lib/auth/session";
import { siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils";

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

function enquiryMailto(title: string) {
  const subject = encodeURIComponent(`Enquiry: ${title}`);
  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle not found",
    };
  }

  return {
    title: vehicle.title,
    description: vehicle.summary,
    alternates: {
      canonical: `/vehicles/${vehicle.slug}`,
    },
    openGraph: {
      title: `${vehicle.title} | Gadinodi`,
      description: vehicle.summary,
      url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
      type: "website",
      images: vehicle.imageUrls[0]
        ? [{ url: vehicle.imageUrls[0], width: 1600, height: 900 }]
        : undefined,
    },
  };
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { slug } = await params;

  const [vehicle, relatedVehicles, session] = await Promise.all([
    getVehicleBySlug(slug),
    getRelatedVehicles(slug, 3),
    getSession(),
  ]);

  if (!vehicle) {
    notFound();
  }

  const isSignedIn = Boolean(session);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Vehicles",
          item: `${siteConfig.url}/vehicles`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: vehicle.title,
          item: `${siteConfig.url}/vehicles/${vehicle.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: vehicle.title,
      description: vehicle.summary,
      image: vehicle.imageUrls,
      category: vehicle.bodyStyle,
      brand: {
        "@type": "Brand",
        name: vehicle.make,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: vehicle.price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: vehicle.sellerName,
        },
      },
    },
  ];

  return (
    <>
      <StructuredData data={schema} />

      <section className="page-hero tw:!py-3 tw:!mb-0">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/vehicles">Vehicles</Link>
            <span>/</span>
            <span>{vehicle.title}</span>
          </div>

          <div className="pdp-hero pdp-hero--image-first tw:gap-4">
            <div
  className="
    pdp-hero__media
    pdp-hero__media--contain
    tw:relative
    tw:h-[200px]
    md:tw:h-[300px]
    tw:flex
    tw:items-center
    tw:justify-center
    tw:bg-transparent
    tw:rounded-[var(--radius-lg)]
    tw:border
    tw:border-gray-200
    tw:shadow-2xl
    tw:overflow-hidden
  "
>
  {vehicle.imageUrls[0] ? (
    <Image
      src={vehicle.imageUrls[0]}
      alt={vehicle.title}
      fill
      sizes="(max-width: 900px) 100vw, 40vw"
      className="tw:object-cover tw:shadow-lg"
    />
  ) : null}

 <div
  className="
    tw:absolute
    tw:-drop-shadow-lg
    tw:top-3
    tw:left-3
    tw:flex
    tw:gap-2
    tw:z-20
  "
>
<span
className="
pdp-tag
  tw:rounded-full
  tw:bg-purple-500/40
  tw:backdrop-blur-md
  tw:border
  tw:border-white/20

  tw:px-3
  tw:py-2
  tw:text-xs

  tw:font-medium
  tw:text-white
  tw:shadow-sm
  tw:h-fit
  tw:leading-none
"
>

      {vehicle.condition}
    </span>

<span
className="
pdp-tag
  tw:rounded-full
  tw:bg-purple-500/40
  tw:backdrop-blur-md
  tw:border
  tw:border-white/20

  tw:px-3
  tw:py-2
  tw:text-xs

  tw:font-medium
  tw:text-white
  tw:shadow-sm
  tw:h-fit
  tw:leading-none
"
>
      {vehicle.sellerType}
    </span>
  </div>
</div>

            <div className="pdp-hero__content">
              <p className="eyebrow">{vehicle.location}</p>
              <h1>{vehicle.title}</h1>
              <p className="page-copy">{vehicle.description}</p>

              <div className="pdp-inline-meta">
                <span>{vehicle.year}</span>
                <span>{vehicle.fuel}</span>
                <span>{vehicle.transmission}</span>
                <span>{vehicle.mileage}</span>
              </div>

              <div className="pdp-highlight-grid">
                {vehicle.specs.map((spec) => (
                  <article key={spec.label} className="mini-stat">
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </article>
                ))}
              </div>
            </div>

            <aside className="purchase-panel">
              <p className="eyebrow">Price</p>
              <strong className="purchase-panel__price">
                {formatCurrency(vehicle.price)}
              </strong>
              <p>Indicative EMI from {formatCurrency(vehicle.financeEstimate)}/month</p>
            <div className="purchase-panel__actions">
  {isSignedIn ? (
    <Link className="button button--primary" href={enquiryMailto(vehicle.title)}>
      Email your enquiry
    </Link>
  ) : (
    <Link className="button button--primary" href="/login">
      Sign in to enquire
    </Link>
  )}
  
  {/* Contact Seller CTA (Replaced Seller Types button) */}
  <a 
    className="button button--secondary tw:flex tw:items-center tw:justify-center tw:gap-2" 
    href="tel:+919876543210"
  >
    Contact us
  </a>
</div>
              <ul className="compact-list">
                <li>Seller: {vehicle.sellerName}</li>
                <li>Colour: {vehicle.color}</li>
                <li>Seats: {vehicle.seats}</li>
                <li>Seller rating: {vehicle.rating}/5</li>
              </ul>
            </aside>
          </div>

          {vehicle.imageUrls.length > 1 ? (
           <div
  className="vehicle-gallery tw:flex tw:gap-3 tw:overflow-x-auto tw:scroll-smooth tw:snap-x tw:snap-mandatory tw:pb-2 tw:!mt-4"
              aria-label={`${vehicle.title} image gallery`}
            >
              {vehicle.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="vehicle-gallery__item tw:relative tw:h-[180px] tw:min-w-[min(78vw,360px)] tw:snap-start tw:overflow-hidden tw:rounded-2xl tw:bg-white"
                >
                  <Image
  src={vehicle.imageUrls[0]}
  alt={vehicle.title}
  width={650}
  height={420}
  sizes="(max-width: 900px) 100vw, 40vw"
  className="
    tw:rounded-full
    tw:object-contain
    tw:shadow-lg
    tw:w-[75%]
    tw:p-2
  "
/>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section tw:!py-8 tw:md:!py-12">
        <div className="container pdp-layout tw:!gap-5">
          <div className="pdp-content tw:!gap-4">
            <article className="panel">
              <p className="eyebrow">Overview</p>
              <h2>Why buyers shortlist this vehicle</h2>
              <p>{vehicle.summary}</p>
              <ul className="feature-list">
                {vehicle.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>

            <article className="panel">
              <p className="eyebrow">Next steps</p>
              <h2>Talk to someone when you are ready</h2>
              <p>
                Review the seller profile below, compare EMI against your budget, and reach out
                with questions about inspection, registration, or delivery. Signed-in buyers can
                email Gadinodi directly from this page to route their enquiry.
              </p>
            </article>

            <article className="panel">
              <p className="eyebrow">Seller</p>
              <h2>{vehicle.sellerType} listing</h2>
              <p>
                Each seller category follows clear obligations around transparency and buyer
                communication. Ask how test drives, paperwork, and handover work before you
                commit.
              </p>
            </article>
          </div>

          <aside className="pdp-sidebar tw:!gap-4">
            <article className="panel">
              <p className="eyebrow">Seller details</p>
              <h3>{vehicle.sellerName}</h3>
              <p>{vehicle.sellerType}</p>
              <ul className="compact-list">
                <li>Location: {vehicle.location}</li>
                <li>Registration support available through the seller</li>
                <li>Test drives scheduled directly with the seller</li>
              </ul>
            </article>

            <article className="panel">
              <p className="eyebrow">Typical buying path</p>
              <ol className="ordered-list">
                <li>Confirm specification, pricing, and inventory status.</li>
                <li>Arrange inspection or test drive with the seller.</li>
                <li>Complete finance, exchange, insurance, and handover.</li>
              </ol>
            </article>
          </aside>
        </div>
      </section>

      <section className="section section--muted tw:!py-8 tw:md:!py-12">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Similar stock</p>
            <h2>Often compared with this listing</h2>
            <p>Browse related vehicles from the same filters sellers use on Gadinodi.</p>
          </div>

          <div className="vehicle-grid">
            {relatedVehicles.map((candidate) => (
              <VehicleCard
                key={candidate.id}
                vehicle={candidate}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
