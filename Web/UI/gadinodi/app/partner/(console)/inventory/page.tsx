import type { Metadata } from "next";
import Link from "next/link";

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
};

export default async function PartnerInventoryPage() {
  // ORIGINAL FUNCTIONALITY: Safe, authentic async server data requests remain completely untouched
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
    <div className="partner-admin-page">
      
      <header className="partner-admin-page__header">
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
        /* FIXED LAYOUT BOX: Removed any restricting table card bounds */
        <div className="partner-admin-card partner-admin-card--table tw:w-full tw:overflow-visible tw:max-h-none">
          <div className="tw:w-full tw:overflow-visible">
            
            <table className="partner-inventory-table tw:w-full tw:overflow-visible">
              <thead>
                <tr className="tw:overflow-visible">
                  <th>Vehicle Details</th>
                  <th>Year</th>
                  <th>Condition</th>
                  <th>Rental Price</th>
                  <th>Location</th>
                  <th>Updated</th>
                  {/* FIXED WIDTH HEADER: Allocated clear desktop column horizontal space parameters */}
                  <th className="tw:text-right tw:w-24 tw:min-w-[96px]">Actions</th>
                </tr>
              </thead>
              <tbody className="tw:overflow-visible">
                {data.map((row) => (
                  <tr key={row.slug} className="tw:overflow-visible">
                    <td>
                      <strong>{row.title}</strong>
                      <div className="partner-inventory-meta">
                        {row.make} {row.model}
                      </div>
                    </td>
                    <td>{row.year}</td>
                    <td>{row.condition}</td>
                    <td>₹{row.price.toLocaleString("en-IN")}</td>
                    <td>{row.location}</td>
                    <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                    
                    {/* FIXED WIDTH DATA CELL: Sets tw:relative and fixed widths to safely anchor absolute popovers */}
                    <td className="tw:text-right tw:overflow-visible tw:relative tw:w-24 tw:min-w-[96px] tw:px-4">
                      <div className="tw:flex tw:justify-end tw:w-full">
                        <InventoryActions slug={row.slug} />
                      </div>
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