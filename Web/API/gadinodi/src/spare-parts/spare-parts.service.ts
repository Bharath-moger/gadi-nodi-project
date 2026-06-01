import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";

import { vehicleConditions } from "../common/catalog.constants";
import { serializeSparePart } from "../common/prisma-mappers";
import type { SparePartFacets } from "../common/types";
import { PrismaService } from "../prisma/prisma.service";

import { ListSparePartsQueryDto } from "./dto/list-spare-parts-query.dto";

@Injectable()
export class SparePartsService {
  constructor(private readonly prismaService: PrismaService) {}

  async listFacets(): Promise<SparePartFacets> {
    const rows = await this.prismaService.sparePart.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });

    return {
      categories: rows.map((row) => row.category),
      conditions: [...vehicleConditions],
    };
  }

  async listSparePartSlugs(): Promise<string[]> {
    const rows = await this.prismaService.sparePart.findMany({
      select: { slug: true },
      orderBy: { title: "asc" },
    });
    return rows.map((row) => row.slug);
  }

  async listSpareParts(query: ListSparePartsQueryDto) {
    const where: Prisma.SparePartWhereInput = {
      ...(query.category ? { category: query.category } : {}),
      ...(query.condition ? { condition: query.condition } : {}),
    };

    const parts = await this.prismaService.sparePart.findMany({
      where,
      take: query.limit,
      orderBy: [{ price: "asc" }, { title: "asc" }],
    });

    return parts.map(serializeSparePart);
  }

  async getSparePartBySlug(slug: string) {
    const part = await this.prismaService.sparePart.findUnique({
      where: { slug },
    });
    return part ? serializeSparePart(part) : null;
  }
}
