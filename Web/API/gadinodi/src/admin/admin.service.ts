import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import type { AdminListQueryDto } from "./dto/admin-list-query.dto";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [
      userCount,
      vehicleCount,
      sparePartCount,
      partnerProfileCount,
      partnerVehicleCount,
      pendingPartnerApprovals,
      newUsersLast7Days,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.vehicle.count(),
      this.prisma.sparePart.count(),
      this.prisma.partnerProfile.count(),
      this.prisma.vehicle.count({ where: { ownerUserId: { not: null } } }),
      this.prisma.partnerProfile.count({ where: { onboardingCompleted: false } }),
      this.prisma.user.count({ where: { createdAt: { gte: since7d } } }),
    ]);

    return {
      userCount,
      vehicleCount,
      sparePartCount,
      partnerProfileCount,
      partnerVehicleCount,
      pendingPartnerApprovals,
      newUsersLast7Days,
    };
  }

  async listUsers(query: AdminListQueryDto) {
    const take = query.take ?? 50;
    const skip = query.skip ?? 0;
    const rows = await this.prisma.user.findMany({
      take,
      skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        partnerProfile: { select: { id: true } },
      },
    });
    return {
      items: rows.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt,
        isPartner: Boolean(u.partnerProfile),
      })),
      take,
      skip,
    };
  }

  async listPartners(query: AdminListQueryDto) {
    const take = query.take ?? 50;
    const skip = query.skip ?? 0;
    const items = await this.prisma.partnerProfile.findMany({
      take,
      skip,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        businessName: true,
        phone: true,
        city: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, email: true, name: true, role: true } },
        partnerType: { select: { slug: true, name: true } },
      },
    });
    return { items, take, skip };
  }

  async listInventory(query: AdminListQueryDto) {
    const take = query.take ?? 50;
    const skip = query.skip ?? 0;
    const items = await this.prisma.vehicle.findMany({
      take,
      skip,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        make: true,
        model: true,
        year: true,
        condition: true,
        price: true,
        location: true,
        sellerName: true,
        ownerUserId: true,
        isFeatured: true,
        updatedAt: true,
      },
    });
    return { items, take, skip };
  }

  async listApprovals(query: AdminListQueryDto) {
    const take = query.take ?? 50;
    const skip = query.skip ?? 0;
    const items = await this.prisma.partnerProfile.findMany({
      where: { onboardingCompleted: false },
      take,
      skip,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        businessName: true,
        phone: true,
        city: true,
        createdAt: true,
        user: { select: { email: true, name: true } },
        partnerType: { select: { slug: true, name: true } },
      },
    });
    return { items, take, skip, total: await this.prisma.partnerProfile.count({ where: { onboardingCompleted: false } }) };
  }

  async getReports() {
    const [vehiclesByCondition, usersTotal] = await Promise.all([
      this.prisma.vehicle.groupBy({
        by: ["condition"],
        _count: { id: true },
      }),
      this.prisma.user.count(),
    ]);
    return {
      usersTotal,
      vehiclesByCondition: vehiclesByCondition.map((row) => ({
        condition: row.condition,
        count: row._count.id,
      })),
    };
  }

  getSettings() {
    return {
      supportEmail: process.env.SUPPORT_EMAIL ?? null,
      uiOrigin: process.env.UI_ORIGIN ?? null,
    };
  }

  getSystemSnapshot() {
    return {
      nodeEnv: process.env.NODE_ENV ?? "development",
      uptimeSeconds: Math.round(process.uptime()),
    };
  }
}
