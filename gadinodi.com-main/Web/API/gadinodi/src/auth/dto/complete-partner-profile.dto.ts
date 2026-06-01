import { IsOptional, IsString, MinLength } from "class-validator";

export class CompletePartnerProfileDto {
  @IsString()
  @MinLength(1)
  partnerTypeSlug!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

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
