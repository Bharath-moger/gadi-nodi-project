import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterPartnerDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password!: string;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  partnerTypeSlug!: string;

  @IsString()
  @MinLength(1)
  businessName!: string;

  @IsString()
  @MinLength(5)
  phone!: string;

  @IsString()
  @MinLength(1)
  city!: string;
}
