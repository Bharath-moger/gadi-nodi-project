import type { MetadataRoute } from "next";

import {
  getPartnerSlugs,
  getSparePartSlugs,
  getVehicleSlugs,
  getVehicleTypeSlugs,
} from "@/lib/api";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let vehicleSlugs: string[] = [];
  let partnerSlugs: string[] = [];
  let vehicleTypeSlugs: string[] = [];
  let sparePartSlugs: string[] = [];

  try {
    [vehicleSlugs, partnerSlugs, vehicleTypeSlugs, sparePartSlugs] = await Promise.all([
      getVehicleSlugs(),
      getPartnerSlugs(),
      getVehicleTypeSlugs(),
      getSparePartSlugs(),
    ]);
  } catch {
    /* API unreachable — keep static routes only */
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/vehicles`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/spare-parts`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/partners`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const vehicleTypeRoutes = vehicleTypeSlugs.map((slug) => ({
    url: `${siteConfig.url}/vehicle-types/${slug}`,
    lastModified: new Date("2026-05-09"),
    changeFrequency: "weekly" as const,
    priority: 0.82,
  }));

  const vehicleRoutes = vehicleSlugs.map((slug) => ({
    url: `${siteConfig.url}/vehicles/${slug}`,
    lastModified: new Date("2026-05-09"),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const partnerRoutes = partnerSlugs.map((slug) => ({
    url: `${siteConfig.url}/partners/${slug}`,
    lastModified: new Date("2026-05-09"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const sparePartRoutes = sparePartSlugs.map((slug) => ({
    url: `${siteConfig.url}/spare-parts/${slug}`,
    lastModified: new Date("2026-05-09"),
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));

  return [
    ...staticRoutes,
    ...vehicleTypeRoutes,
    ...vehicleRoutes,
    ...sparePartRoutes,
    ...partnerRoutes,
  ];
}
