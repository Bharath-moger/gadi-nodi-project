import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class RelatedVehiclesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;
}
