import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { fetchPartnerApi } from "@/lib/partner-server";

export const metadata: Metadata = {
  title: "Seller dashboard",
  robots: { index: false, follow: false },
};

type DashboardPayload = {
  profile: {
    businessName: string;
    city: string;
    phone: string;
    partnerType: { slug: string; name: string };
  };
  vehicleCount: number;
  recentVehicles: Array<{
    slug: string;
    title: string;
    price: number;
    condition: string;
    updatedAt: string;
    imageUrls?: string[];
  }>;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default async function PartnerDashboardPage() {
  const { ok, data } = await fetchPartnerApi<DashboardPayload>("dashboard");
if (!ok || !data) {
    return (
      <div className="partner-admin-page">
        <header className="partner-admin-page__header">
          <h2 className="partner-admin-page__title">Dashboard</h2>
        </header>
        <div className="partner-admin-card">
          <p className="page-copy">
            We could not load your seller summary. Try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const { profile, vehicleCount, recentVehicles } = data;

  return (
    <div className="partner-admin-page">

      {/* Header */}
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Dashboard</h2>
          <p className="partner-admin-page__subtitle">
            Welcome back, {profile.businessName}
          </p>
        </div>
        <div className="partner-admin-page__actions">
          <Link className="button button--secondary" href="/partner/inventory">
            Manage inventory
          </Link>
          <Link className="button button--primary" href="/partner/inventory/new">
            + Add vehicle
          </Link>
        </div>
      </header>

      {/* Seller Profile Card */}
      <article className="partner-admin-card tw:!p-5">
        <p className="eyebrow">Seller profile</p>
        <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:mt-3 tw:sm:grid-cols-4">
          <div>
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-[var(--muted)] tw:mb-1">
              Business
            </p>
            <p className="tw:font-semibold tw:text-sm">{profile.businessName}</p>
          </div>
          <div>
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-[var(--muted)] tw:mb-1">
              Type
            </p>
            <p className="tw:font-semibold tw:text-sm">{profile.partnerType.name}</p>
          </div>
          <div>
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-[var(--muted)] tw:mb-1">
              Location
            </p>
            <p className="tw:font-semibold tw:text-sm">{profile.city}</p>
          </div>
          <div>
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-[var(--muted)] tw:mb-1">
              Contact
            </p>
            <p className="tw:font-semibold tw:text-sm">{profile.phone}</p>
          </div>
        </div>
      </article>

      {/* Stats */}
      <div className="partner-admin-stats">
        <article className="partner-admin-card tw:!p-5">
          <p className="eyebrow">Active listings</p>
          <p className="partner-admin-kpi">{vehicleCount}</p>
          <p className="page-copy tw:!text-sm">
            Vehicles linked to your seller account appear on Gadinodi with your business name.
          </p>
          <Link
            className="tw:inline-flex tw:mt-3 tw:text-sm tw:font-semibold tw:text-[var(--accent-deep)]"
            href="/partner/inventory"
          >
            View all →
          </Link>
        </article>
        <article className="partner-admin-card tw:!p-5">
          <p className="eyebrow">Seller type</p>
          <h3 className="partner-admin-card-title">{profile.partnerType.name}</h3>
          <p className="page-copy tw:!text-sm">
            Buyers see this context next to your listings. To change category, contact support.
          </p>
          <Link
            className="tw:inline-flex tw:mt-3 tw:text-sm tw:font-semibold tw:text-[var(--accent-deep)]"
            href="/partners"
          >
            Learn more →
          </Link>
        </article>
      </div>

      {/* Recently Updated Vehicles */}
      <article className="partner-admin-card tw:!p-5">
        <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
          <p className="eyebrow tw:!mb-0">Recently updated</p>
          <Link
            className="tw:text-sm tw:font-semibold tw:text-[var(--accent-deep)]"
            href="/partner/inventory"
          >
            View all →
          </Link>
        </div>

        {recentVehicles.length === 0 ? (
          <div className="tw:text-center tw:py-10 tw:border tw:border-dashed tw:border-[var(--line)] tw:rounded-2xl">
            <p className="page-copy tw:!text-sm tw:mb-3">
              No vehicles yet. Create your first listing to appear in the public catalogue.
            </p>
            <Link className="button button--primary" href="/partner/inventory/new">
              + Add vehicle
            </Link>
          </div>
        ) : (
          <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
            {recentVehicles.map((v) => (
              <div
                key={v.slug}
                className="tw:rounded-2xl tw:border tw:border-[var(--line)] tw:overflow-hidden tw:bg-white tw:shadow-sm tw:flex tw:flex-col"
              >
                {/* Image */}
                <div className="tw:relative tw:h-[160px] tw:bg-[var(--surface-muted)]">
                  {v.imageUrls?.[0] ? (
                    <Image
                      src={v.imageUrls[0]}
                      alt={v.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="tw:object-cover"
                    />
                  ) : (
                    <div className="tw:flex tw:items-center tw:justify-center tw:h-full tw:text-[var(--muted)] tw:text-sm">
                      No image
                    </div>
                  )}
                  <span className="tw:absolute tw:top-3 tw:left-3 tw:bg-black/40 tw:text-white tw:text-xs tw:font-semibold tw:px-2 tw:py-1 tw:rounded-full tw:backdrop-blur-sm">
                    {v.condition}
                  </span>
                </div>

                {/* Body */}
                <div className="tw:p-4 tw:flex tw:flex-col tw:gap-2 tw:flex-1">
                  <h3 className="tw:font-semibold tw:text-sm tw:leading-snug tw:line-clamp-2">
                    {v.title}
                  </h3>
                  <p className="tw:text-base tw:font-bold tw:tracking-tight">
                    {formatPrice(v.price)}
                  </p>
                  <p className="tw:text-xs tw:text-[var(--muted)]">
                    Updated {formatDate(v.updatedAt)}
                  </p>

                  {/* Actions */}
                  <div className="tw:flex tw:gap-2 tw:mt-auto tw:pt-2">
                    <Link
                      href={`/vehicles/${v.slug}`}
                      className="tw:flex-1 tw:text-center tw:text-xs tw:font-semibold tw:py-2 tw:px-3 tw:rounded-lg tw:border tw:border-[var(--line)] tw:bg-white tw:transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/partner/inventory/${v.slug}`}
                      className="tw:flex-1 tw:text-center tw:text-xs tw:font-semibold tw:py-2 tw:px-3 tw:rounded-lg tw:bg-[var(--accent-soft)] tw:text-[var(--accent-deep)] tw:transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>

    </div>
  );
}