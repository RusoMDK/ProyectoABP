import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  user?: number;
}
