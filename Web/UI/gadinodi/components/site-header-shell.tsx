"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { LogoutButton } from "@/components/logout-button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vehicle-types", label: "Vehicle types" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/spare-parts", label: "Spare parts" },
  { href: "/partners", label: "For sellers" },
] as const;

interface SiteHeaderShellProps {
  isSignedIn: boolean;
  email: string | null;
}

export function SiteHeaderShell({ isSignedIn, email }: SiteHeaderShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand__mark">GN</span>
          <span className="brand__text">
            <strong>Gadinodi</strong>
            <span className="brand__subline">New &amp; used vehicles, priced transparently</span>
          </span>
        </Link>

        <button
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__menu-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>

          <div
            id={panelId}
            className={`site-header__panel ${menuOpen ? "site-header__panel--open" : ""}`}
          >
            <button
              type="button"
              className="site-header__close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-actions">
            {isSignedIn ? (
              <>
                <Link className="button button--ghost" href="/partner/dashboard" onClick={closeMenu}>
                  Seller portal
                </Link>
                {email ? <span className="site-user-email">{email}</span> : null}
                <LogoutButton />
              </>
            ) : (
              <>
                <Link className="button button--ghost" href="/login" onClick={closeMenu}>
                  Sign in
                </Link>
                <Link className="button button--primary" href="/register" onClick={closeMenu}>
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen ? (
        <button type="button" className="site-header__scrim" onClick={closeMenu}>
          <span className="visually-hidden">Close menu</span>
        </button>
      ) : null}
    </header>
  );
}
