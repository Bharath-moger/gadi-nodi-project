import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";

import { ListSparePartsQueryDto } from "./dto/list-spare-parts-query.dto";
import { SparePartsService } from "./spare-parts.service";

@Controller("spare-parts")
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @Get("facets")
  listFacets() {
    return this.sparePartsService.listFacets();
  }

  @Get("slugs")
  listSparePartSlugs() {
    return this.sparePartsService.listSparePartSlugs();
  }

  @Get()
  listSpareParts(@Query() query: ListSparePartsQueryDto) {
    return this.sparePartsService.listSpareParts(query);
  }

  @Get(":slug")
  async getSparePartBySlug(@Param("slug") slug: string) {
    const part = await this.sparePartsService.getSparePartBySlug(slug);

    if (!part) {
      throw new NotFoundException(`Spare part '${slug}' was not found.`);
    }

    return part;
  }
}
