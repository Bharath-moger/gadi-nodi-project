import { Injectable } from "@nestjs/common";

import { serializeVehicle } from "../common/prisma-mappers";
import type {
  VehicleListing,
  VehicleTypeDetail,
  VehicleTypeSummary,
} from "../common/types";
import { PrismaService } from "../prisma/prisma.service";

export type { VehicleTypeDetail, VehicleTypeSummary };

@Injectable()
export class VehicleTypesService {
  constructor(private readonly prisma: PrismaService) {}

  private async listingCountsByBodyStyle(): Promise<Map<string, number>> {
    const grouped = await this.prisma.vehicle.groupBy({
      by: ["bodyStyle"],
      _count: { id: true },
    });

    return new Map(
      grouped.map((row) => [row.bodyStyle, row._count.id]),
    );
  }

  async listWithCounts(): Promise<VehicleTypeSummary[]> {
    const [rows, counts] = await Promise.all([
      this.prisma.vehicleTypeCatalog.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      this.listingCountsByBodyStyle(),
    ]);

    return rows.map((row) => ({
      slug: row.slug,
      code: row.code,
      displayName: row.displayName,
      description: row.description,
      imageUrl: row.imageUrl,
      listingCount: counts.get(row.code) ?? 0,
    }));
  }

  async listSlugs(): Promise<string[]> {
    const rows = await this.prisma.vehicleTypeCatalog.findMany({
      select: { slug: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((r) => r.slug);
  }

  async findBySlug(slug: string): Promise<VehicleTypeDetail | null> {
    const meta = await this.prisma.vehicleTypeCatalog.findUnique({
      where: { slug },
    });
    if (!meta) {
      return null;
    }

    const [listingCount, sampleRows] = await Promise.all([
      this.prisma.vehicle.count({ where: { bodyStyle: meta.code } }),
      this.prisma.vehicle.findMany({
        where: { bodyStyle: meta.code },
        take: 8,
        orderBy: [{ isFeatured: "desc" }, { year: "desc" }, { price: "desc" }],
      }),
    ]);

    return {
      slug: meta.slug,
      code: meta.code,
      displayName: meta.displayName,
      description: meta.description,
      imageUrl: meta.imageUrl,
      listingCount,
      sampleListings: sampleRows.map(serializeVehicle),
    };
  }
}
