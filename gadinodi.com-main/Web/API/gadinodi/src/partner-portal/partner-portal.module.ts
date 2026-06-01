import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";

import { PartnerPortalController } from "./partner-portal.controller";
import { PartnerPortalService } from "./partner-portal.service";

@Module({
  imports: [PrismaModule],
  controllers: [PartnerPortalController],
  providers: [PartnerPortalService],
})
export class PartnerPortalModule {}
