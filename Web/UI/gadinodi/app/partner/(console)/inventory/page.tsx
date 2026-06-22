import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; 

import { fetchPartnerApi } from "@/lib/partner-server";
import { InventoryActions } from "./inventory-actions";

export const metadata: Metadata = {
  title: "Inventory",
  robots: { index: false, follow: false },
};

type InventoryRow = {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  price: number;
  location: string;
  updatedAt: string;
  imageUrls?: string[]; 
};

export default async function PartnerInventoryPage() {
  const { ok, data } = await fetchPartnerApi<InventoryRow[]>("vehicles");
  if (!ok || !data) {
    return (
      <div className="partner-admin-page">
        <header className="partner-admin-page__header">
          <h2 className="partner-admin-page__title">Inventory</h2>
        </header>
        <div className="partner-admin-card">
          <p className="page-copy">Could not load inventory. Try again shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="partner-admin-page tw:overflow-visible">
      
      <header className="partner-admin-page__header tw:overflow-visible">
        <div>
          <h2 className="partner-admin-page__title">Inventory</h2>
          <p className="partner-admin-page__subtitle">
            {data.length} listing{data.length === 1 ? "" : "s"} in your seller account
          </p>
        </div>
        <div className="partner-admin-page__actions">
          <Link className="button button--primary" href="/partner/inventory/new">
            Add vehicle
          </Link>
        </div>
      </header>

      {data.length === 0 ? (
        <div className="partner-admin-card">
          <p className="page-copy">You have no listings yet.</p>
          <Link className="button button--primary partner-admin-inline-action" href="/partner/inventory/new">
            Create listing
          </Link>
        </div>
      ) : (
        <div className="partner-admin-card partner-admin-card--table !tw:overflow-visible !tw:max-h-none tw:mb-20">
          <div className="tw:w-full !tw:overflow-visible">
            
            <table className="partner-inventory-table tw:w-full !tw:overflow-visible">
              <thead>
                <tr>
                  <th>Vehicle Details</th>
                  <th>Year</th>
                  <th>Condition</th>
                  <th>Rental Price</th>
                  <th>Location</th>
                  <th>Updated</th>
                  <th className="tw:text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="!tw:overflow-visible">
                {data.map((row) => (
                  <tr key={row.slug} className="!tw:overflow-visible">
                    <td className="!tw:overflow-visible">
                      <div className="tw:flex tw:items-center tw:gap-4">
                        
                        {/* 1. Thumbnail Box Layout */}
                        {/* CHANGED: Swapped tw:w-12 to tw:w-16 (wider box) to give landscape vehicle pictures a naturally clean aspect ratio space */}
                        <div className="tw:w-16 tw:h-12 tw:rounded-md tw:overflow-hidden tw:bg-neutral-100 tw:flex-shrink-0 tw:relative tw:border tw:border-neutral-200/80">
                          {row.imageUrls && row.imageUrls.length > 0 ? (
                            <Image
                              src={row.imageUrls[0]}
                              alt={row.title}
                              fill
                              sizes="64px"
                              /* ─── FIXED HERE: Changed from tw:object-cover to tw:object-contain so the whole car is fully visible ─── */
                              className="tw:object-contain tw:p-0.5"
                            />
                          ) : (
                            <div className="tw:w-full tw:h-full tw:flex tw:items-center tw:justify-center tw:text-neutral-400 tw:text-[9px] tw:font-bold tw:bg-neutral-100 tw:select-none">
                              NO IMG
                            </div>
                          )}
                        </div>

                        {/* 2. Text Layout block */}
                        <div>
                          <strong className="tw:block">{row.title}</strong>
                          <div className="partner-inventory-meta">
                            {row.make} {row.model}
                          </div>
                        </div>

                      </div>
                    </td>
                    <td>{row.year}</td>
                    <td>{row.condition}</td>
                    <td>₹{row.price.toLocaleString("en-IN")}</td>
                    <td>{row.location}</td>
                    <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                    
                    <td className="tw:text-right !tw:overflow-visible tw:relative">
                      <InventoryActions slug={row.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  );
}