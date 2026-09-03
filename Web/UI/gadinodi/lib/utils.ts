export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildQueryString(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export function listingCardHints(isSignedIn: boolean) {
  if (isSignedIn) {
    return {
      primaryLabel: "View listing",
      secondaryHint:
        "Signed in — open the listing to enquire or compare EMI.",
      secondaryHref: null as string | null,
    };
  }

  return {
    primaryLabel: "View listing",
    secondaryHint: "Sign in to save vehicles and send enquiries",
    secondaryHref: "/login",
  };
}

export function sparePartCardHints(isSignedIn: boolean) {
  if (isSignedIn) {
    return {
      primaryLabel: "View part",
      secondaryHint: "Signed in — open the listing to enquire about fitment or stock.",
      secondaryHref: null as string | null,
    };
  }

  return {
    primaryLabel: "View part",
    secondaryHint: "Sign in to save parts and send enquiries",
    secondaryHref: "/login",
  };
}
