import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";

import { SparePartsController } from "./spare-parts.controller";
import { SparePartsService } from "./spare-parts.service";

@Module({
  imports: [PrismaModule],
  controllers: [SparePartsController],
  providers: [SparePartsService],
})
export class SparePartsModule {}
