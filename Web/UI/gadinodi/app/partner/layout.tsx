import type { ReactNode } from "react";

/** Partner console routes use a full-viewport shell without the public site header/footer. */
export default function PartnerRootLayout({ children }: { children: ReactNode }) {
  return children;
}
