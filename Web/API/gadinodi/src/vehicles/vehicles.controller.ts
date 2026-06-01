import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from "@nestjs/common";

import { ListVehiclesQueryDto } from "./dto/list-vehicles-query.dto";
import { RelatedVehiclesQueryDto } from "./dto/related-vehicles-query.dto";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get("slugs")
  listVehicleSlugs() {
    return this.vehiclesService.listVehicleSlugs();
  }

  @Get()
  listVehicles(@Query() query: ListVehiclesQueryDto) {
    return this.vehiclesService.listVehicles(query);
  }

  @Get(":slug")
  async getVehicleBySlug(@Param("slug") slug: string) {
    const vehicle = await this.vehiclesService.getVehicleBySlug(slug);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle '${slug}' was not found.`);
    }

    return vehicle;
  }

  @Get(":slug/related")
  async getRelatedVehicles(
    @Param("slug") slug: string,
    @Query() query: RelatedVehiclesQueryDto,
  ) {
    const vehicle = await this.vehiclesService.getRelatedVehicles(slug, query.limit);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle '${slug}' was not found.`);
    }

    return vehicle;
  }
}
