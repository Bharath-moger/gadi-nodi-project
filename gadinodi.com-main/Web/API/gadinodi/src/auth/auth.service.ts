import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

import type { CompletePartnerProfileDto } from "./dto/complete-partner-profile.dto";
import type { RegisterPartnerDto } from "./dto/register-partner.dto";
import type { RegisterDto } from "./dto/register.dto";
import type { LoginDto } from "./dto/login.dto";
import { PrismaService } from "../prisma/prisma.service";

export type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        name: dto.name?.trim() || null,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return {
      accessToken: await this.issueAccessToken(user),
      user,
    };
  }

  async registerPartner(dto: RegisterPartnerDto) {
    const email = dto.email.toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException("An account with this email already exists");
    }

    const partnerType = await this.prisma.partnerType.findUnique({
      where: { slug: dto.partnerTypeSlug.trim() },
    });
    if (!partnerType) {
      throw new BadRequestException("Unknown partner category. Pick a seller type from the partners page.");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        name: dto.name.trim(),
        partnerProfile: {
          create: {
            partnerTypeId: partnerType.id,
            businessName: dto.businessName.trim(),
            phone: dto.phone.trim(),
            city: dto.city.trim(),
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        partnerProfile: {
          select: {
            id: true,
            businessName: true,
            phone: true,
            city: true,
            onboardingCompleted: true,
            partnerType: { select: { slug: true, name: true } },
          },
        },
      },
    });

    const safe: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      accessToken: await this.issueAccessToken(safe),
      user: safe,
      partnerProfile: user.partnerProfile,
    };
  }

  async completePartnerProfile(userId: string, dto: CompletePartnerProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, partnerProfile: { select: { id: true } } },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.partnerProfile) {
      throw new ForbiddenException("Partner profile already exists for this account.");
    }

    const partnerType = await this.prisma.partnerType.findUnique({
      where: { slug: dto.partnerTypeSlug.trim() },
    });
    if (!partnerType) {
      throw new BadRequestException("Unknown partner category.");
    }

    const nameUpdate = dto.name?.trim();
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(nameUpdate ? { name: nameUpdate } : {}),
        partnerProfile: {
          create: {
            partnerTypeId: partnerType.id,
            businessName: dto.businessName.trim(),
            phone: dto.phone.trim(),
            city: dto.city.trim(),
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        partnerProfile: {
          select: {
            id: true,
            businessName: true,
            phone: true,
            city: true,
            onboardingCompleted: true,
            partnerType: { select: { slug: true, name: true } },
          },
        },
      },
    });

    return {
      user: { id: updated.id, email: updated.email, name: updated.name, role: updated.role },
      partnerProfile: updated.partnerProfile,
    };
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        partnerProfile: {
          select: {
            id: true,
            businessName: true,
            phone: true,
            city: true,
            onboardingCompleted: true,
            partnerType: { select: { slug: true, name: true } },
          },
        },
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        partnerProfile: {
          select: {
            id: true,
            businessName: true,
            partnerType: { select: { slug: true, name: true } },
          },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const safe: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      accessToken: await this.issueAccessToken(safe),
      user: safe,
      partnerProfile: user.partnerProfile,
    };
  }

  private async issueAccessToken(user: SafeUser) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
