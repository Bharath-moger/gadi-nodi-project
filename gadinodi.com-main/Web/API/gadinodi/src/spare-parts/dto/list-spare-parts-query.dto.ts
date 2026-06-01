import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { vehicleConditions } from "../../common/catalog.constants";

export class ListSparePartsQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(vehicleConditions)
  condition?: (typeof vehicleConditions)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;
}
