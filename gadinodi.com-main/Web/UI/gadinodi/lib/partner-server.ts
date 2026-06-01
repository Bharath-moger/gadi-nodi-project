import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getInternalApiBase } from "@/lib/internal-api";

export async function fetchPartnerApi<T>(
  pathname: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return { ok: false, status: 401, data: null };
  }
  const path = pathname.replace(/^\/+/, "");
  const url = `${getInternalApiBase()}/partner/${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers as Record<string, string>),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const data = res.ok ? ((await res.json().catch(() => null)) as T) : null;
  return { ok: res.ok, status: res.status, data };
}
