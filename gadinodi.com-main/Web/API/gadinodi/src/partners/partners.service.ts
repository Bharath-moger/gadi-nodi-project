import { Injectable } from "@nestjs/common";

import { serializePartnerType } from "../common/prisma-mappers";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async listPartners() {
    const partnerTypes = await this.prismaService.partnerType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return partnerTypes.map(serializePartnerType);
  }

  async listPartnerSlugs() {
    const partnerTypes = await this.prismaService.partnerType.findMany({
      select: {
        slug: true,
      },
      orderBy: {
        slug: "asc",
      },
    });

    return partnerTypes.map((partnerType) => partnerType.slug);
  }

  async getPartnerBySlug(slug: string) {
    const partnerType = await this.prismaService.partnerType.findUnique({
      where: {
        slug,
      },
    });

    if (!partnerType) {
      return null;
    }

    return serializePartnerType(partnerType);
  }
}
