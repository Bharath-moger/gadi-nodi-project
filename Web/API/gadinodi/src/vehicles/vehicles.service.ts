import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";

import { serializeVehicle } from "../common/prisma-mappers";
import { PrismaService } from "../prisma/prisma.service";
import { ListVehiclesQueryDto } from "./dto/list-vehicles-query.dto";

@Injectable()
export class VehiclesService {
  constructor(private readonly prismaService: PrismaService) {}

  async listVehicleSlugs() {
    const rows = await this.prismaService.vehicle.findMany({
      select: {
        slug: true,
      },
      orderBy: {
        slug: "asc",
      },
    });

    return rows.map((row) => row.slug);
  }

  async listVehicles(query: ListVehiclesQueryDto) {
    const where: Prisma.VehicleWhereInput = {
      ...(query.bodyStyle ? { bodyStyle: query.bodyStyle } : {}),
      ...(query.condition ? { condition: query.condition } : {}),
      ...(query.fuel ? { fuel: query.fuel } : {}),
      ...(query.sellerType ? { sellerType: query.sellerType } : {}),
      ...(typeof query.featured === "boolean" ? { isFeatured: query.featured } : {}),
    };

    const vehicles = await this.prismaService.vehicle.findMany({
      where,
      take: query.limit,
      orderBy: [{ isFeatured: "desc" }, { year: "desc" }, { price: "desc" }],
    });

    return vehicles.map(serializeVehicle);
  }

  async getVehicleBySlug(slug: string) {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: {
        slug,
      },
    });

    if (!vehicle) {
      return null;
    }

    return serializeVehicle(vehicle);
  }

  async getRelatedVehicles(slug: string, limit = 3) {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: {
        slug,
      },
    });

    if (!vehicle) {
      return null;
    }

    const relatedVehicles = await this.prismaService.vehicle.findMany({
      where: {
        slug: {
          not: slug,
        },
        OR: [{ bodyStyle: vehicle.bodyStyle }, { fuel: vehicle.fuel }],
      },
      take: limit,
      orderBy: [{ isFeatured: "desc" }, { year: "desc" }, { price: "desc" }],
    });

    return relatedVehicles.map(serializeVehicle);
  }
}
