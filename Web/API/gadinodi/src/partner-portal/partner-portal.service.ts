import { randomBytes } from "node:crypto";

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import type { CreatePartnerVehicleDto } from "./dto/create-partner-vehicle.dto";
import type { UpdatePartnerVehicleDto } from "./dto/update-partner-vehicle.dto";

function slugFromTitle(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return (base.length > 0 ? base : "listing") + "-" + randomBytes(3).toString("hex");
}

@Injectable()
export class PartnerPortalService {
  constructor(private readonly prisma: PrismaService) {}

  private async requireProfile(userId: string) {
    const profile = await this.prisma.partnerProfile.findUnique({
      where: { userId },
      include: { partnerType: { select: { id: true, slug: true, name: true } } },
    });
    if (!profile) {
      throw new ForbiddenException("Complete partner onboarding to access this area.");
    }
    return profile;
  }

  async getDashboard(userId: string) {
    const profile = await this.requireProfile(userId);
    const [vehicleCount, vehicles] = await Promise.all([
      this.prisma.vehicle.count({ where: { ownerUserId: userId } }),
      this.prisma.vehicle.findMany({
        where: { ownerUserId: userId },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          slug: true,
          title: true,
          price: true,
          condition: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      profile: {
        id: profile.id,
        businessName: profile.businessName,
        city: profile.city,
        phone: profile.phone,
        partnerType: profile.partnerType,
      },
      vehicleCount,
      recentVehicles: vehicles,
    };
  }

  async getVehicle(userId: string, slug: string) {
    await this.requireProfile(userId);
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { slug, ownerUserId: userId },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        make: true,
        model: true,
        year: true,
        condition: true,
        price: true,
        mileage: true,
        fuel: true,
        bodyStyle: true,
        transmission: true,
        location: true,
        description: true,
        summary: true,
        color: true,
        seats: true,
        updatedAt: true,
      },
    });
    if (!vehicle) {
      throw new NotFoundException("Vehicle not found in your inventory.");
    }
    return vehicle;
  }

  async listInventory(userId: string) {
    await this.requireProfile(userId);
    return this.prisma.vehicle.findMany({
      where: { ownerUserId: userId },
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
        updatedAt: true,
      },
    });
  }

  async createVehicle(userId: string, dto: CreatePartnerVehicleDto) {
    const profile = await this.requireProfile(userId);
    let slug = slugFromTitle(dto.title);
    for (let attempt = 0; attempt < 8; attempt++) {
      const clash = await this.prisma.vehicle.findUnique({ where: { slug } });
      if (!clash) break;
      slug = slugFromTitle(dto.title + " " + attempt);
    }

    const location = dto.location?.trim() || profile.city;
    const subtitle =
      dto.subtitle?.trim() ||
      `${dto.condition} · ${dto.make} ${dto.model} · listed by ${profile.businessName}`;
    const description =
      dto.description?.trim() ||
      `Listed on Gadinodi by ${profile.businessName}. Contact the seller through your Gadinodi account for next steps.`;
    const summary =
      dto.summary?.trim() ||
      `${dto.make} ${dto.model} (${dto.year}) — ${profile.businessName}, ${location}.`;
    const color = dto.color?.trim() || "—";
    const seats = dto.seats ?? 5;
    const financeEstimate = Math.max(5000, Math.round((dto.price * 0.09) / 12 / 100) * 100);

    return this.prisma.vehicle.create({
      data: {
        slug,
        title: dto.title.trim(),
        subtitle,
        make: dto.make.trim(),
        model: dto.model.trim(),
        year: dto.year,
        condition: dto.condition,
        price: dto.price,
        mileage: dto.mileage.trim(),
        fuel: dto.fuel,
        bodyStyle: dto.bodyStyle.trim(),
        transmission: dto.transmission,
        location,
        sellerName: profile.businessName,
        sellerType: profile.partnerType.name,
        description,
        summary,
        color,
        seats,
        financeEstimate,
        rating: 4.5,
        heroTone: "linear-gradient(135deg, #1e1b4b, #6366f1)",
        features: [],
        specs: [] as unknown as Prisma.InputJsonValue,
        isFeatured: false,
        partnerTypeId: profile.partnerTypeId,
        ownerUserId: userId,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
      },
    });
  }

  private async getOwnedVehicle(userId: string, slug: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { slug, ownerUserId: userId },
    });
    if (!vehicle) {
      throw new NotFoundException("Vehicle not found in your inventory.");
    }
    return vehicle;
  }

  async updateVehicle(userId: string, slug: string, dto: UpdatePartnerVehicleDto) {
    await this.getOwnedVehicle(userId, slug);
    const data: Prisma.VehicleUpdateInput = {};
    if (dto.title !== undefined) data.title = dto.title.trim();
    if (dto.subtitle !== undefined) data.subtitle = dto.subtitle.trim();
    if (dto.make !== undefined) data.make = dto.make.trim();
    if (dto.model !== undefined) data.model = dto.model.trim();
    if (dto.year !== undefined) data.year = dto.year;
    if (dto.condition !== undefined) data.condition = dto.condition;
    if (dto.price !== undefined) {
      data.price = dto.price;
      const price = dto.price;
      data.financeEstimate = Math.max(5000, Math.round((price * 0.09) / 12 / 100) * 100);
    }
    if (dto.mileage !== undefined) data.mileage = dto.mileage.trim();
    if (dto.fuel !== undefined) data.fuel = dto.fuel;
    if (dto.bodyStyle !== undefined) data.bodyStyle = dto.bodyStyle.trim();
    if (dto.transmission !== undefined) data.transmission = dto.transmission;
    if (dto.location !== undefined) data.location = dto.location.trim();
    if (dto.description !== undefined) data.description = dto.description.trim();
    if (dto.summary !== undefined) data.summary = dto.summary.trim();
    if (dto.color !== undefined) data.color = dto.color.trim();
    if (dto.seats !== undefined) data.seats = dto.seats;

    if (Object.keys(data).length === 0) {
      throw new BadRequestException("No fields to update.");
    }

    return this.prisma.vehicle.update({
      where: { slug },
      data,
      select: { id: true, slug: true, title: true, price: true, updatedAt: true },
    });
  }

  async deleteVehicle(userId: string, slug: string) {
    await this.getOwnedVehicle(userId, slug);
    await this.prisma.vehicle.delete({ where: { slug } });
    return { ok: true };
  }
}
