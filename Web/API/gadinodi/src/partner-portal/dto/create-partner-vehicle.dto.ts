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

export class CreatePartnerVehicleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  subtitle?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  make!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  model!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1980)
  year!: number;

  @IsEnum(VehicleCondition)
  condition!: VehicleCondition;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  price!: number;

  @IsString()
  @MinLength(1)
  mileage!: string;

  @IsEnum(FuelType)
  fuel!: FuelType;

  @IsString()
  @MinLength(1)
  bodyStyle!: string;

  @IsEnum(Transmission)
  transmission!: Transmission;

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

  @Type(() => Number)
  @IsInt()
  @Min(2)
  @IsOptional()
  seats?: number;

  @IsOptional()
  @ArrayMaxSize(8)
  @IsUrl({ require_protocol: true }, { each: true })
  @MaxLength(2048, { each: true })
  imageUrls?: string[];
}
