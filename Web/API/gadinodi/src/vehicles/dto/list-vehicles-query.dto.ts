import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { fuelTypes, vehicleConditions, vehicleTypes } from "../../common/catalog.constants";

export class ListVehiclesQueryDto {
  @IsOptional()
  @IsIn(vehicleTypes)
  bodyStyle?: (typeof vehicleTypes)[number];

  @IsOptional()
  @IsIn(vehicleConditions)
  condition?: (typeof vehicleConditions)[number];

  @IsOptional()
  @IsIn(fuelTypes)
  fuel?: (typeof fuelTypes)[number];

  @IsOptional()
  @IsString()
  sellerType?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;
}
