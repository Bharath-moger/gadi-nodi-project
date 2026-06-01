import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { PartnersService } from "./partners.service";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get("slugs")
  listPartnerSlugs() {
    return this.partnersService.listPartnerSlugs();
  }

  @Get()
  listPartners() {
    return this.partnersService.listPartners();
  }

  @Get(":slug")
  async getPartnerBySlug(@Param("slug") slug: string) {
    const partner = await this.partnersService.getPartnerBySlug(slug);

    if (!partner) {
      throw new NotFoundException(`Partner type '${slug}' was not found.`);
    }

    return partner;
  }
}
