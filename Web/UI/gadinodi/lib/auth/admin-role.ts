import type { AuthMe } from "@/lib/auth/me";

export type AdminRole = "admin" | "superadmin";

export function resolveAdminRole(me: AuthMe | null): AdminRole | null {
  if (!me) {
    return null;
  }
  if (me.role === "Superadmin") {
    return "superadmin";
  }
  if (me.role === "Admin") {
    return "admin";
  }
  return null;
}
