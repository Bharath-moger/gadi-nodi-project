export function getInternalApiBase(): string {
  const base =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://127.0.0.1:4000/api";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export function formatApiError(data: unknown): string {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as { message: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
    if (Array.isArray(message)) {
      return message.map(String).join(", ");
    }
  }
  return "Something went wrong. Please try again.";
}
