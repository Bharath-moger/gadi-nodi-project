import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { getInternalApiBase } from "@/lib/internal-api";

export const SESSION_COOKIE_NAME = "gadinodi_session";

export type SessionUser = {
  sub: string;
  email: string;
};

/** Validates the JWT by calling GET /api/auth/me when local verification is skipped or fails. */
async function validateSessionWithApi(token: string): Promise<SessionUser | null> {
  try {
    const res = await fetch(`${getInternalApiBase()}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return null;
    }
    const user = (await res.json()) as { id: string; email: string };
    if (typeof user.id === "string" && typeof user.email === "string") {
      return { sub: user.id, email: user.email };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const secret = process.env.JWT_SECRET;
  if (secret) {
    try {
      const key = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"],
      });
      const sub = payload.sub;
      const email = payload.email;
      if (typeof sub === "string" && typeof email === "string") {
        return { sub, email };
      }
    } catch {
      /* Wrong secret, expired token, or malformed — try API if reachable */
    }
  }

  if (process.env.NODE_ENV === "development" && !secret) {
    console.warn(
      "[auth] JWT_SECRET is not set in Web/UI/gadinodi/.env.local — session uses GET /auth/me per request. Copy JWT_SECRET from Web/API/gadinodi/.env for faster verification.",
    );
  }

  return validateSessionWithApi(token);
}
