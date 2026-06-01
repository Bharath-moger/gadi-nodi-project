"use client";

import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  redirectTo?: string;
};

export function LogoutButton({ redirectTo = "/" }: LogoutButtonProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button type="button" className="button button--ghost" onClick={handleLogout}>
      Sign out
    </button>
  );
}
