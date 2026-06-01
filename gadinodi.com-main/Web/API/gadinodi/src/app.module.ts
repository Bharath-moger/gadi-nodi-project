import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envValidationSchema } from "./common/env.validation";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health.controller";
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { PartnerPortalModule } from "./partner-portal/partner-portal.module";
import { PartnersModule } from "./partners/partners.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SparePartsModule } from "./spare-parts/spare-parts.module";
import { VehiclesModule } from "./vehicles/vehicles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    MarketplaceModule,
    PartnersModule,
    PartnerPortalModule,
    VehiclesModule,
    SparePartsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
