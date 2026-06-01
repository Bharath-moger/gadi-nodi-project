import { SiteHeaderShell } from "@/components/site-header-shell";
import { getSession } from "@/lib/auth/session";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <SiteHeaderShell isSignedIn={Boolean(session)} email={session?.email ?? null} />
  );
}
