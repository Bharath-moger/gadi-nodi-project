import { headers } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { PartnerSidebarNav, type PartnerNavItem } from "@/components/partner-sidebar-nav";
import { LogoutButton } from "@/components/logout-button";
import { fetchAuthMe } from "@/lib/auth/me";

// Look! No extra imports here. Everything is safe and clean.

const NAV_ITEMS: readonly PartnerNavItem[] = [
  { href: "/partner/dashboard", label: "Dashboard", icon: "DB" },
  {
    href: "/partner/inventory",
    label: "Inventory",
    icon: "IV",
    excludePaths: ["/partner/inventory/new"],
  },
  { href: "/partner/inventory/new", label: "Add vehicle", icon: "AD", exact: true },
  { href: "/vehicles", label: "Public catalogue", icon: "ST" },
];

export default async function PartnerConsoleLayout({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "/partner/dashboard";
  const me = await fetchAuthMe();
  
  // Existing authentication & onboarding guards completely untouched
  if (!me) {
    redirect(`/partner/login?redirect=${encodeURIComponent(pathname)}`);
  }
  if (!me.partnerProfile) {
    redirect("/partner/onboarding");
  }

  const { businessName, partnerType, city, phone } = me.partnerProfile;

  return (
    <section className="partner-admin">
      <div className="partner-admin__shell">
        <aside className="partner-admin__sidebar">
          
          {/* 1. Added a clean HTML close button marker */}
          <button className="partner-admin__close-btn" id="mobile-close-trigger">✕</button>

          <Link href="/partner/dashboard" className="partner-admin__brand">
            <span className="partner-admin__brand-mark">GN</span>
            <span className="partner-admin__brand-copy">
              <strong>Partner Console</strong>
              <small>Gadinodi Seller</small>
            </span>
          </Link>

          <p className="partner-admin__menu-title">Main menu</p>
          <PartnerSidebarNav items={NAV_ITEMS} />

          <div className="partner-admin__account">
            <p className="partner-admin__account-name">{businessName}</p>
            <p className="partner-admin__account-meta">{partnerType.name}</p>
            <p className="partner-admin__account-meta">{city}</p>
            <p className="partner-admin__account-meta">{me.email}</p>
            <p className="partner-admin__account-meta">{phone}</p>
            <div className="partner-admin__signout">
              <LogoutButton redirectTo="/partner/login" />
            </div>
          </div>
        </aside>

        <div className="partner-admin__main">
          <header className="partner-admin__topbar">
            
            {/* 2. Added a static hamburger menu icon button with id */}
            <button className="partner-admin__hamburger" id="mobile-hamburger-trigger">
              <span></span><span></span><span></span>
            </button>

            <div>
              <p className="partner-admin__topbar-eyebrow">Seller workspace</p>
              <h1 className="partner-admin__topbar-title">{businessName}</h1>
            </div>
            <span className="partner-admin__topbar-badge">{partnerType.name}</span>
          </header>
          <div className="partner-admin__content">{children}</div>
        </div>
      </div>

      {/* 3. Added the overlay backdrop mask layer with id */}
      <div className="partner-admin__scrim" id="mobile-scrim-trigger" />
    </section>
  );
}