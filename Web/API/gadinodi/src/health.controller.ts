import { Controller, Get } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("health")
  async getHealth() {
    await this.prismaService.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      service: "gadinodi-api",
      database: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
