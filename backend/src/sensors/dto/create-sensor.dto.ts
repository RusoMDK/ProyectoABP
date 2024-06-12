import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Device } from 'src/device/entities/device.entity';
import { Escenary } from 'src/escenary/entities/escenary.entity';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  escenary: Escenary;

  @IsNumber()
  device: Device;
}
