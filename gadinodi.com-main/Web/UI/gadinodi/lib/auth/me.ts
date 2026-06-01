import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getInternalApiBase } from "@/lib/internal-api";

export type AuthMePartnerType = {
  slug: string;
  name: string;
};

export type AuthMePartnerProfile = {
  id: string;
  businessName: string;
  phone: string;
  city: string;
  onboardingCompleted: boolean;
  partnerType: AuthMePartnerType;
};

export type AuthMeRole = "Buyer" | "Admin" | "Superadmin";

export type AuthMe = {
  id: string;
  email: string;
  name: string | null;
  role: AuthMeRole;
  partnerProfile: AuthMePartnerProfile | null;
};

function parseRole(value: unknown): AuthMeRole {
  if (value === "Admin" || value === "Superadmin" || value === "Buyer") {
    return value;
  }
  return "Buyer";
}

function parseAuthMe(data: unknown): AuthMe | null {
  if (!data || typeof data !== "object") {
    return null;
  }
  const o = data as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.email !== "string") {
    return null;
  }
  const name = o.name === null || typeof o.name === "string" ? (o.name as string | null) : null;
  let partnerProfile: AuthMePartnerProfile | null = null;
  if (o.partnerProfile && typeof o.partnerProfile === "object") {
    const p = o.partnerProfile as Record<string, unknown>;
    const pt = p.partnerType;
    if (
      typeof p.id === "string" &&
      typeof p.businessName === "string" &&
      typeof p.phone === "string" &&
      typeof p.city === "string" &&
      typeof p.onboardingCompleted === "boolean" &&
      pt &&
      typeof pt === "object" &&
      typeof (pt as Record<string, unknown>).slug === "string" &&
      typeof (pt as Record<string, unknown>).name === "string"
    ) {
      partnerProfile = {
        id: p.id,
        businessName: p.businessName,
        phone: p.phone,
        city: p.city,
        onboardingCompleted: p.onboardingCompleted,
        partnerType: {
          slug: (pt as { slug: string }).slug,
          name: (pt as { name: string }).name,
        },
      };
    }
  }
  return {
    id: o.id,
    email: o.email,
    name,
    role: parseRole(o.role),
    partnerProfile,
  };
}

export async function fetchAuthMe(): Promise<AuthMe | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`${getInternalApiBase()}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return null;
    }
    const data: unknown = await res.json().catch(() => null);
    return parseAuthMe(data);
  } catch {
    return null;
  }
}
