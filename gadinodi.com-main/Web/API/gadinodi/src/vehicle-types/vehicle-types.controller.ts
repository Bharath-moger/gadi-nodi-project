import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { VehicleTypesService } from "./vehicle-types.service";

@Controller("vehicle-types")
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Get()
  list() {
    return this.vehicleTypesService.listWithCounts();
  }

  @Get("slugs")
  slugs() {
    return this.vehicleTypesService.listSlugs();
  }

  @Get(":slug")
  async getOne(@Param("slug") slug: string) {
    const detail = await this.vehicleTypesService.findBySlug(slug);
    if (!detail) {
      throw new NotFoundException("Vehicle type not found");
    }
    return detail;
  }
}
