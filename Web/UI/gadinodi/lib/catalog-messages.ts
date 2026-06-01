/** Customer-facing copy when catalogue data cannot be loaded — never expose stack traces or infra details. */

export const CATALOG_LOAD_FAILED_TITLE = "We're sorry—live listings are taking a break";

export const CATALOG_LOAD_FAILED_BODY =
  "Something interrupted our connection to the marketplace catalogue. We're working to restore it as quickly as we can. Please try refreshing this page in a few minutes. Thank you for your patience.";

/** Generic fetch failure shown when errors propagate (e.g. error boundaries). */
export const CATALOG_FETCH_GENERIC =
  "We're sorry—we couldn't load this content right now. Please try again in a moment.";
