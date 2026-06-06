"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react"; // 1. ADD THIS IMPORT

export type PartnerNavItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
  excludePaths?: string[];
};

function isNavActive(pathname: string, item: PartnerNavItem) {
  if (item.excludePaths?.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false;
  }
  if (item.exact) {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function PartnerSidebarNav({ items }: { items: readonly PartnerNavItem[] }) {
  const pathname = usePathname() ?? "";

  // ========================================================
  // 2. ADD THIS ENTIRE HOOK BLOCK RIGHT HERE
  // ========================================================
  useEffect(() => {
    // Automatically dismiss the mobile navigation drawer whenever the page URL updates
    document.body.classList.remove("mobile-nav-active");

    // Match up the click target node elements by their string IDs
    const hamburger = document.getElementById("mobile-hamburger-trigger");
    const closeBtn = document.getElementById("mobile-close-trigger");
    const scrim = document.getElementById("mobile-scrim-trigger");

    const toggleMenu = () => document.body.classList.toggle("mobile-nav-active");
    const closeMenu = () => document.body.classList.remove("mobile-nav-active");

    if (hamburger) hamburger.addEventListener("click", toggleMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (scrim) scrim.addEventListener("click", closeMenu);

    // Clean up our active memory event streams when unmounting layouts
    return () => {
      if (hamburger) hamburger.removeEventListener("click", toggleMenu);
      if (closeBtn) closeBtn.removeEventListener("click", closeMenu);
      if (scrim) scrim.removeEventListener("click", closeMenu);
    };
  }, [pathname]);
  // ========================================================

  return (
    <nav className="partner-admin__nav" aria-label="Seller portal">
      {items.map((item) => {
        const active = isNavActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active ? "partner-admin__nav-link partner-admin__nav-link--active" : "partner-admin__nav-link"
            }
          >
            <span className="partner-admin__nav-icon" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}