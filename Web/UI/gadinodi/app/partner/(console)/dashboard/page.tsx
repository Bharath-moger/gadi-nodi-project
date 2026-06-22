import type { Metadata } from "next";
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
  }>;
};

export default async function PartnerDashboardPage() {
  const { ok, data } = await fetchPartnerApi<DashboardPayload>("dashboard");
if (!ok || !data) {
    return (
      <div className="partner-admin-page">
        <header className="partner-admin-page__header">
          <h2 className="partner-admin-page__title">Dashboard</h2>
        </header>
        <div className="partner-admin-card">
          <p className="page-copy">We could not load your seller summary. Try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const { profile, vehicleCount, recentVehicles } = data;

  return (
    <div className="partner-admin-page">
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Dashboard</h2>
          <p className="partner-admin-page__subtitle">
            {profile.businessName} · {profile.city} · {profile.phone}
          </p>
        </div>
        <div className="partner-admin-page__actions">
          <Link className="button button--secondary" href="/partner/inventory">
            Manage inventory
          </Link>
          <Link className="button button--primary" href="/partner/inventory/new">
            Add vehicle
          </Link>
        </div>
      </header>

      <div className="partner-admin-stats">
        <article className="partner-admin-card">
          <p className="eyebrow">Active listings</p>
          <p className="partner-admin-kpi">{vehicleCount}</p>
          <p className="page-copy">
            Vehicles linked to your seller account appear on Gadinodi with your business name.
          </p>
        </article>
        <article className="partner-admin-card">
          <p className="eyebrow">Seller type</p>
          <h3 className="partner-admin-card-title">{profile.partnerType.name}</h3>
          <p className="page-copy">
            Buyers see this context next to your listings. To change category, contact support for now.
          </p>
        </article>
      </div>

      <article className="partner-admin-card partner-admin-card--spaced">
        <p className="eyebrow">Recently updated</p>
        {recentVehicles.length === 0 ? (
          <p className="page-copy">No vehicles yet. Create your first listing to appear in the public catalogue.</p>
        ) : (
          <ul className="feature-list partner-admin-list">
            {recentVehicles.map((v) => (
              <li key={v.slug}>
                <Link href={`/partner/inventory/${v.slug}`} className="text-link">
                  {v.title}
                </Link>{" "}
                · ₹{v.price.toLocaleString("en-IN")} · {v.condition}
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
