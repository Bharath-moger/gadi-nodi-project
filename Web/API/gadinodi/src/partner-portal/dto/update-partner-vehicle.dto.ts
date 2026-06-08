import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsUrl,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

import { FuelType, Transmission, VehicleCondition } from "@prisma/client";

export class UpdatePartnerVehicleDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  make?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1980)
  year?: number;

  @IsOptional()
  @IsEnum(VehicleCondition)
  condition?: VehicleCondition;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  mileage?: string;

  @IsOptional()
  @IsEnum(FuelType)
  fuel?: FuelType;

  @IsOptional()
  @IsString()
  bodyStyle?: string;

  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  summary?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  color?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  seats?: number;

  @IsOptional()
  @ArrayMaxSize(8)
  @IsUrl({ require_protocol: true }, { each: true })
  @MaxLength(2048, { each: true })
  imageUrls?: string[];
}
