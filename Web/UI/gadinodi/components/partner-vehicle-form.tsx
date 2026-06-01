"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

function apiErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") {
    return fallback;
  }
  const message = (data as { message?: unknown }).message;
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return message.map(String).join(", ");
  }
  return fallback;
}

const CONDITIONS = ["New", "Used"] as const;
const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "Other"] as const;
const TRANSMISSIONS = ["Automatic", "Manual"] as const;

export type PartnerVehicleInitial = {
  slug: string;
  title: string;
  subtitle?: string;
  make: string;
  model: string;
  year: number;
  condition: (typeof CONDITIONS)[number];
  price: number;
  mileage: string;
  fuel: (typeof FUELS)[number];
  bodyStyle: string;
  transmission: (typeof TRANSMISSIONS)[number];
  location?: string;
  description?: string;
  summary?: string;
  color?: string;
  seats?: number;
};

type PartnerVehicleFormProps = {
  mode: "create" | "edit";
  initial?: PartnerVehicleInitial;
};

export function PartnerVehicleForm({ mode, initial }: PartnerVehicleFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const fd = new FormData(form);

    const payload: Record<string, unknown> = {
      title: String(fd.get("title") ?? "").trim(),
      make: String(fd.get("make") ?? "").trim(),
      model: String(fd.get("model") ?? "").trim(),
      year: Number(fd.get("year")),
      condition: String(fd.get("condition")),
      price: Number(fd.get("price")),
      mileage: String(fd.get("mileage") ?? "").trim(),
      fuel: String(fd.get("fuel")),
      bodyStyle: String(fd.get("bodyStyle") ?? "").trim(),
      transmission: String(fd.get("transmission")),
    };

    const subtitle = String(fd.get("subtitle") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const description = String(fd.get("description") ?? "").trim();
    const summary = String(fd.get("summary") ?? "").trim();
    const color = String(fd.get("color") ?? "").trim();
    const seatsRaw = String(fd.get("seats") ?? "").trim();
    if (subtitle) payload.subtitle = subtitle;
    if (location) payload.location = location;
    if (description) payload.description = description;
    if (summary) payload.summary = summary;
    if (color) payload.color = color;
    if (seatsRaw) payload.seats = Number(seatsRaw);

    try {
      if (mode === "create") {
        const res = await fetch("/api/partner/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(apiErrorMessage(data, "Could not create listing"));
          setPending(false);
          return;
        }
        const created = data as { slug?: string };
        router.push(created.slug ? `/partner/inventory/${created.slug}` : "/partner/inventory");
      } else if (initial?.slug) {
        const res = await fetch(`/api/partner/vehicles/${encodeURIComponent(initial.slug)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(apiErrorMessage(data, "Could not update listing"));
          setPending(false);
          return;
        }
        router.push("/partner/inventory");
      }
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setPending(false);
    }
  }

  return (
    <form className="auth-form partner-vehicle-form" onSubmit={onSubmit}>
      {error ? <p className="auth-error">{error}</p> : null}

      <div className="field">
        <label htmlFor="pv-title">Title</label>
        <input
          id="pv-title"
          name="title"
          type="text"
          required
          disabled={pending}
          defaultValue={initial?.title}
        />
      </div>

      <div className="field">
        <label htmlFor="pv-subtitle">Subtitle (optional)</label>
        <input
          id="pv-subtitle"
          name="subtitle"
          type="text"
          disabled={pending}
          defaultValue={initial?.subtitle}
        />
      </div>

      <div className="field partner-vehicle-form__row">
        <div>
          <label htmlFor="pv-make">Make</label>
          <input
            id="pv-make"
            name="make"
            type="text"
            required
            disabled={pending}
            defaultValue={initial?.make}
          />
        </div>
        <div>
          <label htmlFor="pv-model">Model</label>
          <input
            id="pv-model"
            name="model"
            type="text"
            required
            disabled={pending}
            defaultValue={initial?.model}
          />
        </div>
      </div>

      <div className="field partner-vehicle-form__row">
        <div>
          <label htmlFor="pv-year">Year</label>
          <input
            id="pv-year"
            name="year"
            type="number"
            min={1980}
            max={2035}
            required
            disabled={pending}
            defaultValue={initial?.year}
          />
        </div>
        <div>
          <label htmlFor="pv-price">Price (INR)</label>
          <input
            id="pv-price"
            name="price"
            type="number"
            min={1}
            required
            disabled={pending}
            defaultValue={initial?.price}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="pv-condition">Condition</label>
        <select
          id="pv-condition"
          name="condition"
          required
          disabled={pending}
          defaultValue={initial?.condition ?? "Used"}
        >
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="pv-mileage">Mileage</label>
        <input
          id="pv-mileage"
          name="mileage"
          type="text"
          placeholder="e.g. 42,000 km"
          required
          disabled={pending}
          defaultValue={initial?.mileage}
        />
      </div>

      <div className="field partner-vehicle-form__row">
        <div>
          <label htmlFor="pv-fuel">Fuel</label>
          <select
            id="pv-fuel"
            name="fuel"
            required
            disabled={pending}
            defaultValue={initial?.fuel ?? "Petrol"}
          >
            {FUELS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pv-transmission">Transmission</label>
          <select
            id="pv-transmission"
            name="transmission"
            required
            disabled={pending}
            defaultValue={initial?.transmission ?? "Manual"}
          >
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="pv-bodystyle">Body style</label>
        <input
          id="pv-bodystyle"
          name="bodyStyle"
          type="text"
          placeholder="e.g. SUV"
          required
          disabled={pending}
          defaultValue={initial?.bodyStyle}
        />
      </div>

      <div className="field">
        <label htmlFor="pv-location">Location (optional)</label>
        <input
          id="pv-location"
          name="location"
          type="text"
          disabled={pending}
          defaultValue={initial?.location}
        />
      </div>

      <div className="field partner-vehicle-form__row">
        <div>
          <label htmlFor="pv-color">Colour (optional)</label>
          <input id="pv-color" name="color" type="text" disabled={pending} defaultValue={initial?.color} />
        </div>
        <div>
          <label htmlFor="pv-seats">Seats (optional)</label>
          <input
            id="pv-seats"
            name="seats"
            type="number"
            min={2}
            disabled={pending}
            defaultValue={initial?.seats}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="pv-summary">Summary (optional)</label>
        <textarea id="pv-summary" name="summary" rows={2} disabled={pending} defaultValue={initial?.summary} />
      </div>

      <div className="field">
        <label htmlFor="pv-description">Description (optional)</label>
        <textarea
          id="pv-description"
          name="description"
          rows={4}
          disabled={pending}
          defaultValue={initial?.description}
        />
      </div>

      <button className="button button--primary auth-submit" type="submit" disabled={pending}>
        {pending ? "Saving…" : mode === "create" ? "Publish listing" : "Save changes"}
      </button>

      <p className="auth-switch">
        <Link href="/partner/inventory">Back to inventory</Link>
      </p>
    </form>
  );
}
