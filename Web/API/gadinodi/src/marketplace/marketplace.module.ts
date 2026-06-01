import { Module } from "@nestjs/common";

import { VehicleTypesModule } from "../vehicle-types/vehicle-types.module";
import { MarketplaceController } from "./marketplace.controller";
import { MarketplaceService } from "./marketplace.service";

@Module({
  imports: [VehicleTypesModule],
  providers: [MarketplaceService],
  controllers: [MarketplaceController],
})
export class MarketplaceModule {}
