import { Injectable } from "@nestjs/common";

import {
  fuelTypes,
  homepageVehicleChips,
  transmissionTypes,
  vehicleConditions,
  vehicleTypes,
} from "../common/catalog.constants";
import {
  serializeMarketStat,
  serializePartnerType,
  serializeVehicle,
} from "../common/prisma-mappers";
import type { MarketplaceFacets, MarketplaceHomeData } from "../common/types";
import { PrismaService } from "../prisma/prisma.service";
import { VehicleTypesService } from "../vehicle-types/vehicle-types.service";

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly vehicleTypesService: VehicleTypesService,
  ) {}

  async getHomePageData(): Promise<MarketplaceHomeData> {
    const [marketStats, featuredVehicles, partnerTypes, vehicleTypes] = await Promise.all([
      this.prismaService.marketStat.findMany({
        orderBy: {
          sortOrder: "asc",
        },
      }),
      this.prismaService.vehicle.findMany({
        where: {
          isFeatured: true,
        },
        orderBy: [{ year: "desc" }, { price: "desc" }],
      }),
      this.prismaService.partnerType.findMany({
        orderBy: {
          name: "asc",
        },
      }),
      this.vehicleTypesService.listWithCounts(),
    ]);

    return {
      categories: [...homepageVehicleChips],
      vehicleTypes,
      marketStats: marketStats.map(serializeMarketStat),
      featuredVehicles: featuredVehicles.map(serializeVehicle),
      partnerTypes: partnerTypes.map(serializePartnerType),
    };
  }

  async getMarketplaceFacets(): Promise<MarketplaceFacets> {
    const sellerTypeRows = await this.prismaService.vehicle.findMany({
      select: {
        sellerType: true,
      },
    });

    return {
      categories: [...vehicleTypes],
      conditions: [...vehicleConditions],
      fuels: [...fuelTypes],
      transmissions: [...transmissionTypes],
      sellerTypes: Array.from(new Set(sellerTypeRows.map((row) => row.sellerType))).sort(),
    };
  }
}
