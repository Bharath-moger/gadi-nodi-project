import { headers } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { PartnerSidebarNav, type PartnerNavItem } from "@/components/partner-sidebar-nav";
import { LogoutButton } from "@/components/logout-button";
import { fetchAuthMe } from "@/lib/auth/me";
import { MobileMenuToggle } from "./mobile-menu-toggle";

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
  // ORIGINAL FUNCTIONALITY: Safe, authentic async server data requests untouched
  const pathname = (await headers()).get("x-pathname") ?? "/partner/dashboard";
  const me = await fetchAuthMe();
  
  if (!me) {
    redirect(`/partner/login?redirect=${encodeURIComponent(pathname)}`);
  }
  if (!me.partnerProfile) {
    redirect("/partner/onboarding");
  }

  const { businessName, partnerType, city, phone } = me.partnerProfile;

  return (
    /* Base layout allows container unclamp and scrolling mechanics on mobile */
    <section className="partner-admin tw:w-full tw:min-h-screen tw:bg-[#eef1f7] tw:max-lg:h-auto tw:max-lg:min-h-screen tw:max-lg:overflow-x-hidden tw:max-lg:overflow-y-auto">
      
      {/* 1. Client sidekick handles click states safely without disrupting server logic */}
      <MobileMenuToggle />

      {/* Main Structural Shell Container */}
      <div className="partner-admin__shell tw:w-full tw:h-screen tw:min-h-0 tw:grid tw:grid-cols-[272px_minmax(0,1fr)] tw:max-lg:!flex tw:max-lg:!flex-col tw:max-lg:h-auto tw:max-lg:min-h-screen">
        
        {/* Navigation Sidebar Drawer Panel */}
        {/* FIXED: Re-added id="mobile-sidebar-container-target" for exact DOM target selection matching */}
        <aside 
          id="mobile-sidebar-container-target"
          className="partner-admin__sidebar tw:h-full tw:flex tw:flex-col tw:bg-[#0b1220] tw:text-[#d7deea] tw:p-[20px_16px] tw:border-r tw:border-slate-800/24 tw:max-lg:fixed tw:max-lg:inset-y-0 tw:max-lg:left-0 tw:max-lg:w-[272px] tw:max-lg:h-screen tw:max-lg:max-h-none tw:max-lg:z-[1000] tw:max-lg:-translate-x-full tw:max-lg:transition-transform tw:max-lg:duration-200 tw:max-lg:ease-in-out tw:max-lg:border-r-0 tw:max-lg:overflow-y-auto tw:max-lg:overflow-x-hidden tw:max-lg:pb-10 tw:relative"
        >
          
          {/* Close Trigger Button (Targets CSS rule #6) */}
          <button 
            className="partner-admin__close-btn tw:hidden tw:max-lg:!block tw:bg-transparent tw:border-none tw:text-slate-400 tw:text-2xl tw:absolute tw:top-5 tw:right-5 tw:cursor-pointer tw:z-[1050]" 
            id="mobile-close-trigger"
          >
            ✕
          </button>

          <Link href="/partner/dashboard" className="partner-admin__brand tw:shrink-0">
            <span className="partner-admin__brand-mark">GN</span>
            <span className="partner-admin__brand-copy">
              <strong>Partner Console</strong>
              <small>Gadinodi Seller</small>
            </span>
          </Link>

          <p className="partner-admin__menu-title tw:shrink-0 tw:mt-4">Main menu</p>
          
          <div className="tw:shrink-0 tw:basis-auto tw:min-h-0 tw:mb-4">
            <PartnerSidebarNav items={NAV_ITEMS} />
          </div>

          {/* Account detail module container */}
          {/* FIXED CLEAN-UP: Formatted cleanly with pure flex relative mapping to align nicely at bottom of fluid drawers */}
          <div className="partner-admin__account tw:w-full tw:bg-[#0b1220] tw:shrink-0 tw:p-[16px_12px_8px] tw:border-t tw:border-slate-800/20 tw:relative tw:mt-auto tw:max-lg:pb-6 tw:max-lg:!block tw:max-lg:!visible tw:max-lg:!opacity-100">
            <p className="partner-admin__account-name tw:font-semibold tw:text-white">{businessName}</p>
            <p className="partner-admin__account-meta tw:text-xs tw:text-slate-400 tw:mt-0.5">{partnerType.name}</p>
            <p className="partner-admin__account-meta tw:text-xs tw:text-slate-400">{city}</p>
            <p className="partner-admin__account-meta tw:text-xs tw:text-slate-400 tw:break-all">{me.email}</p>
            <p className="partner-admin__account-meta tw:text-xs tw:text-slate-400">{phone}</p>
            
            <div className="partner-admin__signout tw:block tw:mt-4 tw:w-full">
              <LogoutButton redirectTo="/partner/login" />
            </div>
          </div>
        </aside>

        {/* Workspace core container panels */}
        <div className="partner-admin__main tw:min-w-0 tw:min-h-0 tw:h-full tw:grid tw:grid-rows-[auto_minmax(0,1fr)] tw:max-lg:!flex tw:max-lg:!flex-col tw:max-lg:w-full tw:max-lg:h-auto tw:max-lg:overflow-y-visible">
          
          <header className="partner-admin__topbar tw:shrink-0 tw:min-h-[84px] tw:border-b tw:border-slate-900/8 tw:bg-white/96 tw:p-[16px_28px] tw:flex tw:items-center tw:justify-between tw:gap-4 tw:max-lg:w-full">
            
            {/* Hamburger Mobile Trigger Module Component (Targets CSS rule #5) */}
            <button 
              className="partner-admin__hamburger tw:hidden tw:max-lg:!flex tw:relative tw:z-[999] tw:cursor-pointer tw:pointer-events-auto tw:flex-col tw:justify-between tw:w-[22px] tw:h-4 tw:bg-transparent tw:border-none tw:p-0" 
              id="mobile-hamburger-trigger"
            >
              <span className="tw:block tw:w-full tw:h-0.5 tw:bg-[#0f172a] tw:rounded-sm"></span>
              <span className="tw:block tw:w-full tw:h-0.5 tw:bg-[#0f172a] tw:rounded-sm"></span>
              <span className="tw:block tw:w-full tw:h-0.5 tw:bg-[#0f172a] tw:rounded-sm"></span>
            </button>

            <div>
              <p className="partner-admin__topbar-eyebrow">Seller workspace</p>
              <h1 className="partner-admin__topbar-title">{businessName}</h1>
            </div>
            <span className="partner-admin__topbar-badge">{partnerType.name}</span>
          </header>
          
          {/* Dashboard dynamic canvas children container mapping rule #3 padding */}
          <div className="partner-admin__content tw:min-h-0 tw:p-7 tw:max-lg:!block tw:max-lg:w-full tw:max-lg:h-auto tw:max-lg:overflow-y-visible tw:max-lg:pb-[260px] tw:max-lg:pt-5 tw:max-lg:px-4">
            {children}
          </div>
        </div>
      </div>

      {/* Screen Backdrop Overlay Scrim Masking (Targets CSS rule #7) */}
      <div 
        className="partner-admin__scrim tw:hidden tw:max-lg:!block tw:fixed tw:inset-0 tw:bg-slate-900/45 tw:backdrop-blur-[2px] tw:z-[900] tw:opacity-0 tw:pointer-events-none tw:transition-opacity tw:duration-200 tw:ease-in-out" 
        id="mobile-scrim-trigger" 
      />
    </section>
  );
}