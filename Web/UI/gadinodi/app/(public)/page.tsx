import Image from "next/image";
import Link from "next/link";

import { CatalogOfflineBanner } from "@/components/catalog-offline-banner";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { VehicleTypeTile } from "@/components/vehicle-type-tile";
import { loadHomePageData } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils";

export default async function HomePage() {
  const { data, apiAvailable } = await loadHomePageData();
  const { categories, vehicleTypes, featuredVehicles, marketStats, partnerTypes } = data;
  const heroTypePicks = vehicleTypes.slice(0, 8);

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/vehicles?bodyStyle={bodyStyle}`,
        "query-input": "required name=bodyStyle",
      },
    },
    ...(featuredVehicles.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Featured vehicles",
            itemListElement: featuredVehicles.map((vehicle, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
              name: vehicle.title,
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <StructuredData data={homeSchema} />

      {!apiAvailable ? <CatalogOfflineBanner /> : null}

      <div className="home-page">
        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero__bg" aria-hidden />
          <div className="container home-hero__inner">
            <div className="home-hero__copy">
              <p className="home-hero__label">India&apos;s vehicle marketplace</p>
              <h1 className="home-hero__title">
                Find your next car or bike—clear prices, real sellers.
              </h1>
              <p className="home-hero__lead">
                Compare new and used inventory from garages, showrooms, and trusted dealers. Filter
                by what matters, then reach out when you are ready.
              </p>

              <Link href="/vehicles" className="home-search-cta">
                <span className="home-search-cta__placeholder">
                  Search by body style, fuel, or budget…
                </span>
                <span className="home-search-cta__action">Browse inventory</span>
              </Link>

              <div className="home-hero__actions">
                <Link className="button button--primary" href="/vehicles">
                  View all listings
                </Link>
                <Link className="button button--secondary home-hero__ghost-btn" href="/register">
                  Create free account
                </Link>
              </div>

              <div className="home-trust" role="list">
                <span role="listitem">Transparent specs &amp; EMI cues</span>
                <span className="home-trust__dot" aria-hidden />
                <span role="listitem">Seller location &amp; type on every listing</span>
                <span className="home-trust__dot" aria-hidden />
                <span role="listitem">Sign in to save &amp; enquire</span>
              </div>
            </div>

            <aside className="home-hero__panel" aria-label="Highlights">
              <div className="home-hero-card home-hero-card--accent">
                <p className="home-hero-card__label">For buyers</p>
                <p className="home-hero-card__text">
                  One place to scan condition, mileage, fuel, and indicative EMI before you talk to
                  anyone.
                </p>
              </div>
              <div className="home-hero-card">
                <p className="home-hero-card__label">Popular types</p>
                <p className="home-hero-card__hint">
                  Tap a type for a full guide and live listings—from bicycles to tippers and plant.
                </p>
                <div className="home-hero-type-strip">
                  {heroTypePicks.length > 0 ? (
                    heroTypePicks.map((vt) => (
                      <Link
                        key={vt.slug}
                        href={`/vehicle-types/${vt.slug}`}
                        className="home-hero-type-pill"
                      >
                        <span className="home-hero-type-pill__thumb">
                          <Image
                            src={vt.imageUrl}
                            alt=""
                            width={44}
                            height={44}
                            className="home-hero-type-pill__img"
                            style={{ objectFit: "contain", imageRendering: "auto" }}
                          />
                        </span>
                        <span className="home-hero-type-pill__text">{vt.displayName}</span>
                      </Link>
                    ))
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category}
                        className="home-chip"
                        href={`/vehicles?bodyStyle=${encodeURIComponent(category)}`}
                      >
                        {category}
                      </Link>
                    ))
                  ) : (
                    <span className="home-hero-card__muted">
                      <Link href="/vehicle-types">Browse vehicle types</Link> when the catalogue is
                      online.
                    </span>
                  )}
                </div>
                <Link href="/vehicle-types" className="home-hero-card__link-all">
                  All vehicle types →
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Stats */}
        {marketStats.length > 0 ? (
          <section className="home-stat-strip">
            <div className="container">
              <div className="home-stat-strip__grid">
                {marketStats.map((stat) => (
                  <div key={stat.label} className="home-stat-strip__item">
                    <span className="home-stat-strip__value">{stat.value}</span>
                    <span className="home-stat-strip__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Vehicle types — primary discovery */}
        {vehicleTypes.length > 0 ? (
          <section className="home-types-showcase">
            <div className="container">
              <SectionHeading
                align="center"
                eyebrow="Browse by vehicle type"
                title="Every category—from bicycles to concrete mixers"
                description="Dedicated pages with imagery and live inventory counts. Jump straight into filtered listings for each type."
                className="home-types-showcase__heading"
              />
              <div className="home-types-scroll">
                {vehicleTypes.map((vt) => (
                  <VehicleTypeTile key={vt.slug} vehicleType={vt} size="strip" />
                ))}
              </div>
              <div className="home-section-cta">
                <Link href="/vehicle-types" className="button button--secondary">
                  Vehicle types A–Z
                </Link>
                <Link href="/vehicles" className="button button--primary">
                  Full inventory
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* Featured */}
        <section className="home-section home-section--surface">
          <div className="container">
            <SectionHeading
              align="center"
              eyebrow="Featured"
              title="Hand-picked from live inventory"
              description="Tap a listing for full specs, seller details, and next steps."
            />

            {featuredVehicles.length > 0 ? (
              <div className="home-feature-grid">
                {featuredVehicles.map((vehicle) => (
                  <article key={vehicle.id} className="home-feature-card">
                    <Link href={`/vehicles/${vehicle.slug}`} className="home-feature-card__media-link">
                      <div
                        className="home-feature-card__media tw:overflow-hidden"
                        style={{ background: vehicle.heroTone }}
                      >
                        {vehicle.imageUrls[0] ? (
                          <Image
                            src={vehicle.imageUrls[0]}
                            alt={vehicle.title}
                            fill
                            sizes="(max-width: 900px) 100vw, 33vw"
                            className="tw:object-cover"
                          />
                        ) : null}
                        <span className="home-feature-card__tag tw:relative tw:z-[1]">
                          {vehicle.condition}
                        </span>
                        <span className="home-feature-card__tag home-feature-card__tag--ghost tw:relative tw:z-[1]">
                          {vehicle.bodyStyle}
                        </span>
                      </div>
                    </Link>
                    <div className="home-feature-card__body">
                      <div className="home-feature-card__top">
                        <h3 className="home-feature-card__title">
                          <Link href={`/vehicles/${vehicle.slug}`}>{vehicle.title}</Link>
                        </h3>
                        <p className="home-feature-card__subtitle">{vehicle.subtitle}</p>
                      </div>
                      <div className="home-feature-card__meta">
                        <span>{vehicle.location}</span>
                        <span>{vehicle.fuel}</span>
                      </div>
                      <div className="home-feature-card__footer">
                        <span className="home-feature-card__price">{formatCurrency(vehicle.price)}</span>
                        <Link href={`/vehicles/${vehicle.slug}`} className="home-feature-card__link">
                          View details
                          <span aria-hidden> →</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="home-empty">No featured vehicles right now. Try browsing the full catalogue.</p>
            )}

            <div className="home-section-cta">
              <Link href="/vehicles" className="button button--primary">
                See all vehicles
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="home-section">
          <div className="container">
            <SectionHeading
              align="center"
              eyebrow="How it works"
              title="Three steps from browsing to speaking with a seller"
              description="Same flow whether you want a hatchback, SUV, or two-wheeler."
            />

            <ol className="home-steps">
              <li className="home-step">
                <span className="home-step__num" aria-hidden>
                  01
                </span>
                <h3 className="home-step__title">Filter inventory</h3>
                <p className="home-step__text">
                  Narrow by condition, body style, fuel, and more—URLs stay shareable for family or
                  colleagues.
                </p>
              </li>
              <li className="home-step">
                <span className="home-step__num" aria-hidden>
                  02
                </span>
                <h3 className="home-step__title">Compare sellers</h3>
                <p className="home-step__text">
                  See who is listing each vehicle and where they operate before you commit time to a
                  call or visit.
                </p>
              </li>
              <li className="home-step">
                <span className="home-step__num" aria-hidden>
                  03
                </span>
                <h3 className="home-step__title">Enquire with context</h3>
                <p className="home-step__text">
                  Create a free account to save listings and send clearer enquiries when you are ready
                  to move forward.
                </p>
              </li>
            </ol>

            <div className="home-steps__actions">
              <Link className="button button--primary" href="/register">
                Get started free
              </Link>
              <Link className="button button--secondary" href="/vehicles">
                Browse without an account
              </Link>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="home-section home-section--muted">
          <div className="container">
            <SectionHeading
              align="center"
              eyebrow="Seller network"
              title="Who you will find on Gadinodi"
              description="Different seller types—one consistent way to discover and compare listings."
            />

            <div className="home-partner-grid">
              {partnerTypes.map((partnerType) => (
                <article key={partnerType.slug} className="home-partner-card">
                  <span className="home-partner-card__badge">{partnerType.badge}</span>
                  <h3 className="home-partner-card__title">{partnerType.name}</h3>
                  <p className="home-partner-card__desc">{partnerType.description}</p>
                  <ul className="home-partner-card__list">
                    {partnerType.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="home-closing">
          <div className="container home-closing__inner">
            <div className="home-closing__intro">
              <p className="home-closing__eyebrow">Why Gadinodi</p>
              <h2 className="home-closing__title">Inventory that reads clearly—online and on the lot.</h2>
              <p className="home-closing__lead">
                Built for buyers who want substance over noise, and sellers who want serious intent—not
                endless tyre-kicking.
              </p>
            </div>
            <div className="home-closing__cols">
              <div className="home-closing__col">
                <h3 className="home-closing__col-title">Buyers</h3>
                <p className="home-closing__col-text">
                  Honest listing structure, filters that match how people shop in India, and a path to
                  enquiry when you are ready.
                </p>
              </div>
              <div className="home-closing__col">
                <h3 className="home-closing__col-title">Sellers</h3>
                <p className="home-closing__col-text">
                  Reach people who already filtered down—so your team spends time on qualified
                  conversations.
                </p>
              </div>
              <div className="home-closing__col">
                <h3 className="home-closing__col-title">Operations</h3>
                <p className="home-closing__col-text">
                  One catalogue model across listing and detail pages—less fragmentation, easier
                  merchandising.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}