import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "@prisma/client";

import { Roles } from "../common/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

import { AdminService } from "./admin.service";
import { AdminListQueryDto } from "./dto/admin-list-query.dto";

@Controller("admin")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.Admin, UserRole.Superadmin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("dashboard")
  dashboard() {
    return this.adminService.getDashboard();
  }

  @Get("users")
  listUsers(@Query() query: AdminListQueryDto) {
    return this.adminService.listUsers(query);
  }

  @Get("partners")
  listPartners(@Query() query: AdminListQueryDto) {
    return this.adminService.listPartners(query);
  }

  @Get("inventory")
  listInventory(@Query() query: AdminListQueryDto) {
    return this.adminService.listInventory(query);
  }

  @Get("approvals")
  listApprovals(@Query() query: AdminListQueryDto) {
    return this.adminService.listApprovals(query);
  }

  @Get("reports")
  reports() {
    return this.adminService.getReports();
  }

  @Get("settings")
  settings() {
    return this.adminService.getSettings();
  }

  @Get("system")
  @Roles(UserRole.Superadmin)
  system() {
    return this.adminService.getSystemSnapshot();
  }
}
