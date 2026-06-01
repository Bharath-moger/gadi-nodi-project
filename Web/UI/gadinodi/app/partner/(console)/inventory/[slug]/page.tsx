import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PartnerVehicleForm, type PartnerVehicleInitial } from "@/components/partner-vehicle-form";
import { fetchPartnerApi } from "@/lib/partner-server";

type VehiclePayload = {
  slug: string;
  title: string;
  subtitle?: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  price: number;
  mileage: string;
  fuel: string;
  bodyStyle: string;
  transmission: string;
  location?: string;
  description?: string;
  summary?: string;
  color?: string;
  seats?: number;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit ${slug}`,
    robots: { index: false, follow: false },
  };
}

const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "Other"] as const;

function toInitial(v: VehiclePayload): PartnerVehicleInitial {
  const fuel = FUELS.includes(v.fuel as (typeof FUELS)[number])
    ? (v.fuel as PartnerVehicleInitial["fuel"])
    : "Other";
  return {
    slug: v.slug,
    title: v.title,
    subtitle: v.subtitle,
    make: v.make,
    model: v.model,
    year: v.year,
    condition: v.condition === "New" ? "New" : "Used",
    price: v.price,
    mileage: v.mileage,
    fuel,
    bodyStyle: v.bodyStyle,
    transmission: v.transmission === "Automatic" ? "Automatic" : "Manual",
    location: v.location,
    description: v.description,
    summary: v.summary,
    color: v.color,
    seats: v.seats,
  };
}

export default async function PartnerEditVehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { ok, data } = await fetchPartnerApi<VehiclePayload>(`vehicles/${encodeURIComponent(slug)}`);
  if (!ok || !data) {
    notFound();
  }

  const initial = toInitial(data);

  return (
    <div className="partner-admin-page">
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Edit listing</h2>
          <p className="partner-admin-page__subtitle">
            Public URL:{" "}
            <Link href={`/vehicles/${data.slug}`} className="text-link">
              /vehicles/{data.slug}
            </Link>
          </p>
        </div>
      </header>

      <div className="partner-admin-card">
        <PartnerVehicleForm mode="edit" initial={initial} />
      </div>
    </div>
  );
}
