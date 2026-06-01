import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPartnerTypeBySlug } from "@/lib/api";

interface PartnerTypePageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PartnerTypePageProps): Promise<Metadata> {
  const { type } = await params;
  const partnerType = await getPartnerTypeBySlug(type);

  if (!partnerType) {
    return {
      title: "Partner type not found",
    };
  }

  return {
    title: partnerType.name,
    description: partnerType.description,
    alternates: {
      canonical: `/partners/${partnerType.slug}`,
    },
  };
}

export default async function PartnerTypePage({ params }: PartnerTypePageProps) {
  const { type } = await params;
  const partnerType = await getPartnerTypeBySlug(type);

  if (!partnerType) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/partners">Partners</Link>
            <span>/</span>
            <span>{partnerType.name}</span>
          </div>

          <p className="eyebrow">{partnerType.badge}</p>
          <h1>{partnerType.name}</h1>
          <p className="page-copy">{partnerType.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container partner-detail-grid">
          <article className="panel">
            <p className="eyebrow">Who this is for</p>
            <h2>{partnerType.audience}</h2>
            <ul className="feature-list">
              {partnerType.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">At a glance</p>
            <div className="metric-grid">
              {partnerType.metrics.map((metric) => (
                <div key={metric.label} className="mini-stat">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container partner-cta">
          <div>
            <p className="eyebrow">Buyer journey</p>
            <h2>Buyers compare inventory here before they contact your team.</h2>
            <p>
              Encourage serious shoppers to create an account so they can save vehicles and send
              enquiries with full listing context attached.
            </p>
          </div>
          <div className="hero-actions">
            <Link
              className="button button--primary"
              href={`/partner/onboarding?type=${encodeURIComponent(partnerType.slug)}`}
            >
              Create seller account
            </Link>
            <Link className="button button--secondary" href="/vehicles">
              View live inventory
            </Link>
            <Link className="button button--ghost" href="/partners">
              All seller types
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
