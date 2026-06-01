import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { UserRole } from "@prisma/client";

import { CreatePartnerVehicleDto } from "./dto/create-partner-vehicle.dto";
import { UpdatePartnerVehicleDto } from "./dto/update-partner-vehicle.dto";
import { PartnerPortalService } from "./partner-portal.service";

type RequestWithUser = {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  };
};

@Controller("partner")
@UseGuards(AuthGuard("jwt"))
export class PartnerPortalController {
  constructor(private readonly partnerPortalService: PartnerPortalService) {}

  @Get("dashboard")
  dashboard(@Req() req: RequestWithUser) {
    return this.partnerPortalService.getDashboard(req.user.id);
  }

  @Get("vehicles")
  listVehicles(@Req() req: RequestWithUser) {
    return this.partnerPortalService.listInventory(req.user.id);
  }

  @Get("vehicles/:slug")
  getVehicle(@Req() req: RequestWithUser, @Param("slug") slug: string) {
    return this.partnerPortalService.getVehicle(req.user.id, slug);
  }

  @Post("vehicles")
  createVehicle(@Req() req: RequestWithUser, @Body() dto: CreatePartnerVehicleDto) {
    return this.partnerPortalService.createVehicle(req.user.id, dto);
  }

  @Patch("vehicles/:slug")
  updateVehicle(
    @Req() req: RequestWithUser,
    @Param("slug") slug: string,
    @Body() dto: UpdatePartnerVehicleDto,
  ) {
    return this.partnerPortalService.updateVehicle(req.user.id, slug, dto);
  }

  @Delete("vehicles/:slug")
  deleteVehicle(@Req() req: RequestWithUser, @Param("slug") slug: string) {
    return this.partnerPortalService.deleteVehicle(req.user.id, slug);
  }
}
