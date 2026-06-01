import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { UserRole } from "@prisma/client";

import { AuthService } from "./auth.service";
import { CompletePartnerProfileDto } from "./dto/complete-partner-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterPartnerDto } from "./dto/register-partner.dto";
import { RegisterDto } from "./dto/register.dto";

type RequestWithUser = {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  };
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("register-partner")
  registerPartner(@Body() dto: RegisterPartnerDto) {
    return this.authService.registerPartner(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("complete-partner-profile")
  @UseGuards(AuthGuard("jwt"))
  completePartnerProfile(@Req() req: RequestWithUser, @Body() dto: CompletePartnerProfileDto) {
    return this.authService.completePartnerProfile(req.user.id, dto);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  me(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
