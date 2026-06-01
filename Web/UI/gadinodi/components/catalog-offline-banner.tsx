"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  CATALOG_LOAD_FAILED_BODY,
  CATALOG_LOAD_FAILED_TITLE,
} from "@/lib/catalog-messages";
import { siteConfig } from "@/lib/site-config";

export function CatalogOfflineBanner() {
  const router = useRouter();
  const mail = siteConfig.contactEmail;

  return (
    <aside className="catalog-offline-banner" role="status">
      <div className="catalog-offline-banner__inner">
        <p className="catalog-offline-banner__title">{CATALOG_LOAD_FAILED_TITLE}</p>
        <p className="catalog-offline-banner__body">{CATALOG_LOAD_FAILED_BODY}</p>
        <p className="catalog-offline-banner__help">
          Need something urgently?{" "}
          <Link href={`mailto:${mail}`} className="catalog-offline-banner__link">
            Email us at {mail}
          </Link>
          —we&apos;ll do our best to help.
        </p>
        <div className="catalog-offline-banner__actions">
          <button
            type="button"
            className="button button--secondary"
            onClick={() => router.refresh()}
          >
            Try again
          </button>
        </div>
      </div>
    </aside>
  );
}
